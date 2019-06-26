class UsersController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?, only: [:edit, :update]

  def index
  end

  def show
  	@user = User.find(params[:id])
    if current_user
      @following = current_user.from_user_relations
      @does_follow = @following.find { |ut| (ut.to_user_id == @user.id) && (ut.action == 'follow') }
    end
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
    @quality = params[:quality]
    @min_quality_score = (params[:min_quality_score] or 4).to_i

    @reviews = @user.get_reviews(@item_type, @status, @quality, @min_quality_score)
    respond_to do |format|
      format.html { render layout: false }
      format.json { render json: @reviews }
    end
  end

  def toggle_follow
    @user = User.find(params[:id])
    if current_user
      @following = current_user.from_user_relations
      @user_action = @following.find { |u| u.to_user_id == @user.id }
      if @user_action
        @user_action.destroy
      else
        @following.create(to_user: @user, action: "follow")
      end
    end
    redirect_to @user
  end
end