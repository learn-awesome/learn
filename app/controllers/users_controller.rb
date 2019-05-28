class UsersController < ApplicationController
  # include Secured
  def index
  end

  def show
  	@user = User.find(params[:id])
  end
end