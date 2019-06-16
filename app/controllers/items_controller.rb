class ItemsController < ApplicationController
  # include Secured
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

      idea_set.people.build
      idea_set.people.first.role = params[:item][:role]
      idea_set.people.first.person_id = params[:item][:person_id]

      unless idea_set.save
        raise idea_set.errors.first.inspect
      end

      params[:item][:topic].each do |topic_id|
        TopicIdeaSet.create(topic_id: topic_id, idea_set: idea_set)
      end

      item = Item.new(params.require(:item).permit(:name, :item_type_id, :estimated_time, :time_unit))
      # item.search_index = params[:item][:name]
      item.user = current_user
      item.idea_set = idea_set

      item.links.build
      item.links.first.url = params[:item][:url]

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

  def search
    # search or add
  	@q = params[:q]
  	if @q.present?
  		@items = Item.search(@q, 10).to_a
  		if @items.any?
        if @items.size == 1
          respond_to do |format|
            format.html { redirect_to @items.first }
            format.json { render json: @items }
          end
        else
          # render search
          respond_to do |format|
            format.html
            format.json { render json: @items }
          end
        end
  		elsif current_user
        respond_to do |format|
          format.html {
            flash[:danger] = "No items found with name or link as: #{@q}"
            if is_url?(@q)
              redirect_to new_item_path(url: @q)
            else
              redirect_to new_item_path(name: @q)
            end
          }
          format.json { render json: [] }
        end
      else
        respond_to do |format|
          format.html
          format.json { render json: [] }
        end
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

  private
  def is_url?(q)
    q.start_with?('http://') or q.start_with?('https://')
  end
end
