class DashboardController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?
  
  def show
  	@user_topics = current_user.user_topics
    if current_user.following.any?
      @following_reviews = Review.where(user: current_user.following).order("created_at DESC").limit(20)
    else
      @following_reviews = []
    end
  	if @user_topics.blank? and @following_reviews.blank?
  		flash[:success] = "Follow your favorite topics and people to get a personalized dashboard."
  		redirect_to topics_path
  	end
  end
end
