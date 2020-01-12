class TopicsController < ApplicationController
  include Secured
    before_action :logged_in_using_omniauth?, only: [:toggle_follow, :new, :create]
    before_action :merge_ability_check, only: [:merge]

  def index
      respond_to do |format|
        format.html
        format.json { render json: Topic.all }
      end
  end

  def new
    @topic = Topic.new
    @topic.name = params[:name]
  end

  def create
    @topic = Topic.new
    @topic.display_name = params[:topic][:name].to_s.strip
    @topic.name = @topic.display_name.gsub(" ", "-").downcase
    @topic.search_index = @topic.name
    @topic.gitter_room = @topic.name
    @topic.user = current_user
    if @topic.save
      redirect_to @topic
    else
      flash[:danger] = @topic.errors.first
      render :new
    end
  end

  def show
    @item_type = params[:item_type]
    @length = params[:length]
    @quality = params[:quality]
    @topic = Topic.from_param(params[:id])
    if @topic.nil?
        flash[:danger] = "We couldn't find this topic."
        redirect_to root_path and return
    end
    if current_user
      @user_topics = current_user.user_topics
      @does_follow = @user_topics.find { |ut| (ut.topic_id == @topic.id) && (ut.action == 'follow') }
    end
    @item_type_items = @topic.advanced_search(@item_type, @length, @quality).paginate(page: params[:page])
  end

  def toggle_follow
    @topic = Topic.from_param(params[:id])
    if current_user
      @user_topics = current_user.user_topics
      @topic_action = @user_topics.find { |ut| ut.topic_id == @topic.id }
      if @topic_action
        @topic_action.destroy
      else
        @user_topics.create!(topic: @topic, action: "follow")
      end
    end
    redirect_to @topic
  end

  def search
    fuzzy_results = Topic.fuzzy_search(params[:q]).limit(10)
    results = fuzzy_results.empty? ? Topic.search(params[:q]) : fuzzy_results
    render :json => results.as_json(only: [:id, :name])
  end

  def discover
      topic = Topic.discover
      if topic
        redirect_to topic
      else
        flash[:danger] = "No topics exist."
        redirect_to root_path
      end
  end

  def merge
    if request.post?
      Topic.merge(Topic.from_param(params[:id]).id, params[:duplicate_id])
      flash[:success] = "Topics merged successfully."
      redirect_to merge_topic_path(id: params[:id]) and return
    else
      @topic = Topic.from_param(params[:id])
      @topics = Topic.where.not(id: params[:id].to_s.split("-")[0..4].join("-"))
    end
  end

  private

  def merge_ability_check
    if current_user.nil? || !current_user.can_merge_topic?
      flash[:danger] = "Cant merge topic."
      redirect_to topic_path(id: params[:id]) and return
    end
  end
end
