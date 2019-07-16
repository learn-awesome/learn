class WelcomeController < ApplicationController
  def index
  	if current_user
  		@user_topics = current_user.user_topics
  		render 'dashboard/show'
  	end
  end

  def about
  	render :index
  end

  def search
  	# search both items and topics for the top header
  	@q = params[:q]
  	if @q.present?
    	@limit = params[:limit]
    	is_fuzzy = (params[:fuzzy] || "true") == "true"
    	@items = [] # Item.search(@q, 10, is_fuzzy).to_a
    	@topics = Topic.search(@q, 10, is_fuzzy).to_a
      respond_to do |format|
        format.html {
          if (@topics + @items).blank?
            flash[:warning] = "#{@q}: No such topic found"
            redirect_to new_topic_path(name: @q)
            return
          end
          if (@topics + @items).size == 1
            redirect_to (@topics + @items).first
          else
            # render welcome/search
          end
        }
    	  format.json { render json: (@topics + @items) }
      end
      return
    end
    # render welcome/search
  end
end
