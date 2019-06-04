class DashboardController < ApplicationController
  include Secured
  
  def show
  	@user_topics = current_user.user_topics
  end
end
