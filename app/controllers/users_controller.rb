require 'oauth'

class UsersController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?, only: [:edit, :update, :toggle_follow, :settings]
  skip_before_action :verify_authenticity_token, :only => [:inbox]

  def index
    @users = User.order('RANDOM()').limit(100)
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
  		flash[:danger] = "Changes could not be saved: #{@user.errors.first.inspect}"
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
      format.html { render layout: 'embed' }
      format.json { render json: @reviews }
    end
  end

  def toggle_follow
    @user = User.find(params[:id])
    @following = current_user.from_user_relations
    @user_action = @following.find { |u| u.to_user_id == @user.id }
    if @user_action
      @user_action.destroy
    else
      @following.create(to_user: @user, action: "follow")
      UserMailer.with(user: @user, follower: current_user).follow_email.deliver_later
    end
    redirect_to @user
  end

  def settings
    @user = User.find(params[:id])
    if @user.id != current_user.id # users can modify only their own settings
      flash[:danger] = "Not authorized"
      redirect_back(fallback_location: root_path) and return
    end
    if request.patch?
      @user.random_fav_topic = (params[:user]["random_fav_topic"].to_s == "1")
      @user.unsubscribe = (params[:user]["unsubscribe"].to_s == "1")
      item_types = params[:user]["random_fav_item_types"].reject { |s| s.blank? }
      if item_types.blank?
        @user.random_fav_item_types = nil
      else
        @user.random_fav_item_types = item_types.join(",")
      end

      if @user.save
        flash[:success] = "Settings saved."
        redirect_back fallback_location: settings_user_path(@user)
      else
        flash[:danger] = @users.errors.first
        redirect_back fallback_location: settings_user_path(@user)
      end
    end

    def toggle_reviewposting
      @user = User.find(params[:id])
      if @user.id != current_user.id or !request.post? # users can modify only their own settings
        flash[:danger] = "Not authorized"
        redirect_back(fallback_location: settings_user_path(@user)) and return
      end
      social_login = @user.social_logins.where(id: params[:social_login_id]).first
      if !social_login
        flash[:danger] = "Not found"
        redirect_back(fallback_location: settings_user_path(@user)) and return
      end
      social_login.post_reviews = !social_login.post_reviews
      if social_login.save
        flash[:success] = "Settings saved."
        redirect_back fallback_location: settings_user_path(@user)
      else
        flash[:danger] = "Something went wrong: #{social_login.errors.first.inspect}"
        redirect_back fallback_location: settings_user_path(@user)
      end
    end
  end

  def webfinger
    query = params[:resource]
    domain = query.split("@").last
    username = query.split("@").first
    if domain != 'learnawesome.org'
      error = "domain invalid in #{query}"
    end
    if username.split(":").first != 'acct'
      error = "acct prefix not found in #{query}"
    end
    userid = username.split(":").last.gsub("_","-")
    @user = User.find(userid)
    if @user.nil?
      error = "user #{query} not found"
    end

    if error.present?
      render json: {error: error}, status: :not_found
    else
      render json: @user.webfinger_json
    end

  end

  def actor
    @user = User.find(params[:id])
    render json: @user.actor_json
  end

  def inbox
    @user = User.find(params[:id])
    headers = request.headers.env.reject { |key| key.to_s.include?('.') }
    post_body = request.raw_post
    Rails.logger.info "headers = #{headers.inspect}"
    Rails.logger.info "body = #{post_body}"
    @user.add_to_inbox!(headers, post_body)
    render json: {}
  end

  def outbox
    @user = User.find(params[:id])
  end

  def onboarding
    @user = User.find(params[:id])
  end

end
