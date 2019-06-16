class DashboardController < ApplicationController
  include Secured
  
  def show
  	if current_user.nil?
  		# Anubhav's error case. Need to debug.
  		redirect_to("/logout") and return
  	end
  	@user_topics = current_user.user_topics
  	if @user_topics.blank?
  		flash[:success] = "Follow your favorite topics to get a personalized dashboard."
  		redirect_to topics_path
  	end
  end
end
