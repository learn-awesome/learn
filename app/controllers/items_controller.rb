class ItemsController < ApplicationController
  # include Secured
  def index
  end

  def show
  	@item = Item.find(params[:id])
  end

  def new
  end

  def create
    item = nil
    Item.transaction do
      idea_set = IdeaSet.new
      idea_set.name = params[:item][:name]
      unless idea_set.save
        raise idea_set.errors.first.inspect
      end

      params[:item][:topic].each do |topic_id|
        TopicIdeaSet.create(topic_id: topic_id, idea_set: idea_set)
      end

      item = Item.new(params.require(:item).permit(:name, :item_type_id))
      item.idea_set = idea_set
      item.links.build
      item.links.first.url = params[:item][:url]

      item.reviews.build
      item.reviews.first.user = current_user
      item.reviews.first.status = params[:item][:status]
      item.reviews.first.inspirational_score = params[:item][:inspirational_score]
      item.reviews.first.educational_score = params[:item][:educational_score]
      item.reviews.first.difficulty_score = params[:item][:difficulty_score]
      item.reviews.first.entertaining_score = params[:item][:entertaining_score]
      item.reviews.first.notes = params[:item][:notes]

      unless item.save
        raise item.errors.first.inspect
      end
    end
    if item
  	  redirect_to item
    else
      redirect_to :back
    end
  end

  def search
  	@q = params[:q]
  	if @q.present?
  		items = Item.search(@q)
  		if items.first
  			redirect_to items.first
  		elsif current_user
        if is_url?(@q)
          redirect_to new_item_path(url: @q)
        else
          redirect_to new_item_path(name: @q)
        end
      else
        # render search
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

  private
  def is_url?(q)
    q.start_with?('http://') or q.start_with?('https://')
  end
end
