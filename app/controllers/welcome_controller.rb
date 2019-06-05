class WelcomeController < ApplicationController
  def index
  	redirect_to dashboard_path if current_user
  end

  def search
  end

  def about
  	render :index
  end
end
