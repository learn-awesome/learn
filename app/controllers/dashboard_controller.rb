class DashboardController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?
  
  def show
  	@user_topics = current_user.user_topics
    if current_user.following.any?
      @following_reviews = Review.where(user: current_user.following).order("created_at DESC").limit(20)
    else
      @following_reviews = Review.order("created_at DESC").limit(20)
    end
  end
end
