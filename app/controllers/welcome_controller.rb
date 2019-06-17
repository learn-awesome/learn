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
end
