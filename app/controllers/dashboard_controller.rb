class DashboardController < ApplicationController
  include Secured
  
  def show
  	@user_topics = current_user.user_topics
  	if @user_topics.blank?
  		flash[:success] = "Follow your favorite topics to get a personalized dashboard."
  		redirect_to topics_path
  	end
  end
end
