class UsersController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?, only: [:edit, :update]

  def index
  end

  def show
  	@user = User.find(params[:id])
  end

  def edit
  	@user = User.find(params[:id])
  end
  
  def update
  	@user = User.find(params[:id])
  	if @user.id != current_user.id
  		flash[:error] = "Operation not permitted"
  		redirect_back fallback_location: root_path
  	end
  	@user.nickname = params[:user][:nickname]
  	@user.bio = params[:user][:bio]
  	@user.description = params[:user][:description]
  	if @user.save
  		flash[:success] = "Changes saved."
  		redirect_to @user
  	else
  		flash[:error] = "Changes could not be saved: #{@user.errors.first.inspect}"
  		redirect_back fallback_location: root_path
  	end
  end

  def reviews
    @user = User.find(params[:id])
    @item_type = params[:item_type] or 'book'
    @status = params[:status] or 'learned'

    @reviews = @user.get_reviews(@item_type, @status)
    respond_to do |format|
      format.html
      format.json { render json: @reviews }
    end
  end
end