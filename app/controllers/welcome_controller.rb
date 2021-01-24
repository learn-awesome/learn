class WelcomeController < ApplicationController
  skip_before_action :verify_authenticity_token, :only => [:csp_report, :slack_authorize, :slack_command, :twitterhook]

  def index
  	if current_user
      @user_topics = current_user.user_topics
      if current_user.following.any?
        @following_reviews = Review.includes(user: {}, item: {idea_set: [people: {},topics:{},recommendations: {}], reviews: {}, links: {}}).where(user: current_user.following).ready.order("updated_at DESC").limit(50)
      else
        @following_reviews = []
      end
      if @following_reviews and @following_reviews.to_a.size < 20
        @following_reviews = (@following_reviews.to_a + Review.ready.order("updated_at DESC").limit(50).to_a).uniq.shuffle
      end
    	render 'dashboard/show'
    else
      @following_reviews = Review.includes(user: {}, item: {idea_set: [people: {},topics:{},recommendations: {}], reviews: {}, links: {}}).ready.order("updated_at DESC").limit(20).to_a.shuffle
      # redirect_to topics_path
      render 'dashboard/show'
    end
  end

  def about
  end

  def whatsnew
  end

  def isbnsearch
    @isbn = params[:q]
    if @isbn.present?
      item = Item.search_by_isbn(@isbn)
      if item
        redirect_to item and return
      else
        flash[:danger] = "#{@isbn} not found"
      end
    end
  end

  def search
  	# search both items and topics for the top header
  	@q = params[:q]
  	if @q.present?
    	@limit = params[:limit]
    	is_fuzzy = (params[:fuzzy] || "true") == "true"
      fetch_entities(is_fuzzy)
      respond_to do |format|
        format.html {
          @items = Item.search(@q, 10, is_fuzzy).to_a
          if (@topics + @items).size == 1
            redirect_to (@topics + @items).first
          else
            # render welcome/search
          end
        }
        format.json { render json: add_types(@topics.first(5) + @items.first(5)+ @people.first(5))}
      end
      return # render welcome/search
    else
      redirect_to '/items/query' and return
    end
  end

  def add_types(active_record_arr)
    active_record_arr.map { |x| [x.class.name, x] }
  end

  def suggestions
    query = params[:q]
    render json: [query] + Topic.search(query).map {|topic| topic.name} + Item.search(query).map {|item| item.name}
  end

  def digitalgardensetup
  end

  def browser_addon
    redirect_to browser_extension(request)
  end

  def join_slack
    if params['oauth_initiate'].to_s == 'true'
      redirect_to "https://slack.com/oauth/v2/authorize?client_id=1084096741861.1332746175969&scope=chat:write,chat:write.public,commands&user_scope="
      return
    end
  end

  def programs
  end

  def sitemap
    respond_to do |format|
      format.xml
    end
  end

  def collection_discover
    coll = Collection.order('RANDOM()').first
    redirect_to user_collection_path(coll.user, coll)
  end

  def csp_report
    Rails.logger.info request.body.read
  end

  def twitterhookcrccheck
    # Twitter will call this when registering a webhook with a GET
    crc_token = params['crc_token']
    render json: {response_token: "sha256=#{generate_crc_response(ENV['TWBOT_CONSUMER_SECRET'], crc_token)}"}
  end

  def twitterhook
    # Once webhook is registered, twitter will send events here with a POST
    request.body.rewind
    event = request.body.read
    # TODO: Listen for mentions, look up the link in the parent tweet and add topic/item as needed.
    TwitterBotJob.perform_later(event)
    render json: {success: true}
  end

  def slack_authorize
    Rails.logger.info request.body.read
    code = params[:code]
    client_id = ENV['SLACK_CLIENT_ID']
    client_secret = ENV['SLACK_CLIENT_SECRET']

    if client_secret.blank? || client_id.blank? || code.blank?
      @message = "Token(s) missing for Slack authorization"
      return
    end

    resp = HTTParty.get('https://slack.com/api/oauth.v2.access', query: {code: code, client_id: client_id, client_secret: client_secret})
    if resp.code == 200
      data = JSON.parse(resp.body)
      if data['ok']
        # https://api.slack.com/authentication/oauth-v2
        team_id = data["team"]["id"]
        authz = SlackAuthorization.all.select { |a| a.token['team']['id'] == team_id }.first || SlackAuthorization.new
        authz.token = data # overwrite if existing
        unless authz.save
          @message = "Could not save authorization: #{authz.errors.inspect}"
        end
      else
        @message = "Failure in /slack_authorize: #{resp.body}"
      end
    else
      @message = "Something went wrong in /slack_authorize"
    end
  end

  def slack_command
    # https://api.slack.com/interactivity/slash-commands#command_structure
    # /startlearning [topic]
    # /stoplearning [topic]
    # params will be like:
    # {"token"=>"", "team_id"=>"T5P64TVP1", "team_domain"=>"indiumtalk", "channel_id"=>"C019EHTKWLT", "channel_name"=>"learnbot", "user_id"=>"U5NBAPKEE", "user_name"=>"nilesh", "command"=>"/startlearning", "text"=>"python", "api_app_id"=>"A019SMY55UH", "response_url"=>"https://hooks.slack.com/commands/T5P64TVP1/xxx", "trigger_id"=>"xxx"}
    command = params["command"]
    text = params["text"]
    team_id = params['team_id']
    channel_id = params['channel_id']
    topic = Topic.where(name: text).first
    topic = Topic.where("name like ?", "%#{text}%").first unless topic

    unless topic
      render plain: "No such topic found"
      return
    end

    authz = SlackAuthorization.all.select { |a| a.token['team']['id'] == team_id }.first

    response_url = params["response_url"]

    if command == "/startlearning"
      SlackSubscription.find_or_create_by(slack_authorization_id: authz.id, topic_id: topic.id, channel_id: channel_id)
      item = topic.items.shuffle.first
      item_url = Rails.application.routes.url_helpers.item_url(item)
      render json: {"response_type": "in_channel", "text": "Subscribed to #{topic.display_name}. Try this #{ItemType.display_name_singular(item.item_type_id)}? #{item_url}"}
    elsif command == "/stoplearning"
      SlackSubscription.where(slack_authorization_id: authz.id, topic_id: topic.id, channel_id: channel_id).first.try(&:destroy)
      render json: {"response_type": "in_channel", "text": "Unsubscribed to #{topic.display_name}"}
    end
  end

  def dataset
    # This should return fast to stay within Heroku's 30 seconds limit.
    render json: {
      topics: Topic.all
    }
  end

  def components
    # for itempanel component
    @item = Item.includes(idea_set: [people: {},topics:{},recommendations: {}], reviews: {}, links: {}).order(:created_at).first

    # for star-rating component and review status (splitbutton) component. Same item as above.
    @dummy_review = Review.find_or_initialize_by(item: @item, user: current_user)

    # for activitypanel component
    @real_review = Review.includes(user: {}, item: {idea_set: [people: {},topics:{},recommendations: {}], reviews: {}, links: {}}).ready.order('RANDOM()').first
  end

  def kids
    @items = Item.where(level: 'childlike').limit(40)
    @grouping_by = params['grouping'] || 'topic'
    if @grouping_by == 'topic'
      @mapped_items = @items.group_by { |item| item.topics.first }
    else
      @mapped_items = @items.group_by(&:item_type_id).map { |k,v| [ItemType.find(k), v] }.to_h
    end
  end

  private

  def fetch_entities(is_fuzzy)
    @items = Item.search(@q, 10, is_fuzzy)
    @topics = Topic.search(@q, 10, is_fuzzy)
    @people = Person.search(@q, 10, is_fuzzy)
  end

  def generate_crc_response(consumer_secret, crc_token)
    require 'base64'
    require 'json'
		hash = OpenSSL::HMAC.digest('sha256', consumer_secret, crc_token)
		return Base64.encode64(hash).strip!
	end
end
