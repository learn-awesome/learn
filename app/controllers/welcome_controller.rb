class WelcomeController < ApplicationController
  skip_before_action :verify_authenticity_token, :only => [:csp_report, :slack_authorize, :slack_command]

  def index
  	if current_user
      @user_topics = current_user.user_topics
      if current_user.following.any?
        @following_reviews = Review.where(user: current_user.following).order("updated_at DESC").limit(50)
      else
        @following_reviews = []
      end
      if @following_reviews and @following_reviews.to_a.size < 20
        @following_reviews = (@following_reviews.to_a + Review.order("updated_at DESC").limit(50).to_a).uniq.shuffle
      end
    	render 'dashboard/show'
    else
      @following_reviews = Review.order("updated_at DESC").limit(20).to_a.shuffle
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
    redirect_to "https://join.slack.com/t/learnawesomeorg/shared_invite/zt-evhyahcw-FpHIMYqz3S7YkB54Aq2HPQ"
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
    # /startlearning [topic]
    # /stoplearning [topic]
    Rails.logger.info request.body.read
  end

  private

  def fetch_entities(is_fuzzy)
    @items = Item.search(@q, 10, is_fuzzy)
    @topics = Topic.search(@q, 10, is_fuzzy)
    @people = Person.search(@q, 10, is_fuzzy)
  end

  def kids
  end
end
