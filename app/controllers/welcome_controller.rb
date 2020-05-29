class WelcomeController < ApplicationController
  def index
  	if current_user
      @user_topics = current_user.user_topics
      if current_user.following.any?
        @following_reviews = Review.where(user: current_user.following).order("updated_at DESC").limit(20)
      end
      if @following_reviews and @following_reviews.to_a.size < 20
        @following_reviews = (@following_reviews.to_a + Review.order("updated_at DESC").limit(20).to_a).uniq
      end
    	render 'dashboard/show'
    else
      @following_reviews = Review.order("updated_at DESC").limit(20)
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
    request.variant = :tailwind #override as we just have one version
  end

  def browser_addon
    redirect_to browser_extension(request)
  end

  def slack
    redirect_to "https://join.slack.com/t/learnawesomeorg/shared_invite/zt-evhyahcw-FpHIMYqz3S7YkB54Aq2HPQ"
  end

  def programs
    render layout: 'tailwind'
    # redirect_to "https://airtable.com/shrwVW2ihB43qgTmm/tblvYQzpnMRApGWvF"
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
