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
  	if @q.blank?
  		render json: []
  		return
  	end
  	@limit = params[:limit]
  	is_fuzzy = (params[:fuzzy] || "true") == "true"
  	@items = [] # Item.search(@q, 10, is_fuzzy).to_a
  	@topics = Topic.search(@q, 10, is_fuzzy).to_a
  	render json: (@topics + @items)
  end
end
