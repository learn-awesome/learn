class DashboardController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?
  
  def show
  	@user_topics = current_user.user_topics
    if current_user.following.any?
      @following_reviews = Review.where(user: current_user.following).order("updated_at DESC").limit(20)
    end
    if @following_reviews and @following_reviews.to_a.size < 20
      @following_reviews = (@following_reviews.to_a + Review.order("updated_at DESC").limit(20).to_a).uniq.shuffle
    end
  end
end
