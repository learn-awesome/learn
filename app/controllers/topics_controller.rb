class TopicsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?, only: [:toggle_follow, :new, :create, :merge, :edit, :update]
  before_action :permission_check, only: [:merge, :edit, :update]
  respond_to :html, :json
  actions :all, except: [:destroy]

  # def index
  #     respond_to do |format|
  #       format.html
  #       format.json { render json: Topic.all }
  #     end
  # end

  # def new
  #   @topic = Topic.new
  #   @topic.name = params[:name]
  # end

  # def create
  #   @topic = Topic.new
  #   @topic.display_name = params[:topic][:name].to_s.strip
  #   @topic.name = @topic.display_name.gsub(" ", "-").downcase
  #   @topic.search_index = @topic.name
  #   @topic.gitter_room = @topic.name
  #   @topic.user = current_user
  #   if @topic.save
  #     redirect_to @topic
  #   else
  #     flash[:danger] = @topic.errors.first
  #     render :new
  #   end
  # end

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

    if request.variant.to_s =~ /tailwind/
      @item_type_items = @topic.advanced_search(@item_type, @length, @quality)
    else
      @item_type_items = @topic.advanced_search(@item_type, @length, @quality).paginate(page: params[:page])
    end
 
    @learning_plans = @topic.advanced_search('learning_plan', nil, nil)
  end

  def explore
    @topic = Topic.from_param(params[:id])
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
      @topics = Topic.where.not(id: @topic.id).order(:name)
    end
  end

  protected
  def resource
    @topic = Topic.from_param(params[:id])
  end

  private

  def permission_check
   handlers = {edit: :can_edit_topic?, update: :can_edit_topic?, merge: :can_merge_topic?}
    if !current_user.try(handlers[params[:action].to_sym])
      flash[:danger] = "Not allowed"
      redirect_to topic_path(id: params[:id]) and return
    end
  end

  def topic_params
    params.require(:topic).permit(:display_name, :name, :search_index, :gitter_room,
    :gitter_room_id, :parent_id, :second_parent_id, :description)
  end
end
