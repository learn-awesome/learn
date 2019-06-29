class ItemsController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update]

  def index
  end

  def show
  	@item = Item.from_param(params[:id])
  end

  def new
  end

  def create
    item = nil
    Item.transaction do
      idea_set = IdeaSet.new
      idea_set.name = params[:item][:name]

      if params[:item][:person_id].present?
        idea_set.person_idea_set.build
        idea_set.person_idea_set.first.role = params[:item][:role]
        idea_set.person_idea_set.first.person_id = params[:item][:person_id]
      end

      unless idea_set.save
        raise idea_set.errors.first.inspect
      end

      params[:item][:topic].each do |topic_id|
        TopicIdeaSet.create(topic_id: topic_id, idea_set: idea_set)
      end

      item = Item.new(params.require(:item).permit(:name, :item_type_id, :estimated_time, :time_unit, :typical_age_range))
      # item.search_index = params[:item][:name]
      item.user = current_user
      item.idea_set = idea_set

      item.links.build
      item.links.first.url = params[:item][:url]

      unless params[:item][:status].blank?
        item.reviews.build
        item.reviews.first.user = current_user
        item.reviews.first.status = params[:item][:status]
        item.reviews.first.inspirational_score = params[:item][:inspirational_score]
        item.reviews.first.educational_score = params[:item][:educational_score]
        item.reviews.first.challenging_score = params[:item][:challenging_score]
        item.reviews.first.entertaining_score = params[:item][:entertaining_score]
        item.reviews.first.visual_score = params[:item][:visual_score]
        item.reviews.first.interactive_score = params[:item][:interactive_score]
        item.reviews.first.notes = params[:item][:notes]
      end

      unless item.save
        raise item.errors.first.inspect
      end
    end
    if item
  	  redirect_to item
    else
      redirect_back fallback_location: root_path
    end
  end

  def edit
    @item = Item.from_param(params[:id])
  end

  def update
    item = Item.find(params[:id])
    if item
      item.name = params[:name]
      item.item_type_id = params[:item_type_id] if ItemType.find(params[:item_type_id])
      item.idea_set.topic_ids = params[:topics]
      if item.save
        render json: {stats: 'ok'}
      else
        render json: {status: 'error', message: item.errors}
      end
    else
      render json: {status: 'error', message: 'Item not found'}
    end
  end

  def search
    # search or add
  	@q = params[:q]
    is_browser_addon = (params[:ext].to_s == 'true')
  	if @q.present?
  		@items = Item.search(@q, 10, is_fuzzy=true).to_a
      if is_browser_addon # search or add by URL 
        if @items.first
          redirect_to @items.first and return
        else
          redirect_to new_item_path(url: @q) and return
        end
      end
      respond_to do |format|
        format.html
        format.json { render json: @items }
      end
  	end
    # render search form
  end

  def discover
    item = Item.discover
    if item
      redirect_to item
    else
      flash[:danger] = "No items exist."
      redirect_to root_path
    end
  end

  def query
    @topic_name = params[:topic]
    @item_type = params[:item_type]
    @length = params[:length]
    @quality = params[:quality]
    if params[:commit].present?
      # query items
      @items = Item.advanced_search(@topic_name, @item_type, @length, @quality)
    else
      @items = []
    end
  end

end
