class DashboardController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?
  
  def show
  	@user_topics = current_user.user_topics
    if current_user.following.any?
      @following_reviews = Review.where(user: current_user.following).order("updated_at DESC").ready.limit(50)
    else
      @following_reviews = []
    end
    if @following_reviews and @following_reviews.to_a.size < 20
      @following_reviews = (@following_reviews.to_a + Review.ready.order("updated_at DESC").limit(50).to_a).uniq.shuffle
    end
  end

  def forcelogin
    url = params[:redirect_to]
    if url.present? and url.start_with?("/")
      redirect_to url
    else
      flash[:danger] = "Invalid redirect URL"
      redirect_to root_path
    end
  end
end
