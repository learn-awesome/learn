class ItemTypesController < ApplicationController
	def show
		@item_type = ItemType.find(params[:id])
		@topic_name = params[:topic]
		@length = params[:length]
		@quality = params[:quality]

		if @item_type.nil?
			flash[:danger] = "We couldn't find this format."
			redirect_to root_path and return
		end

		if request.variant.to_s =~ /tailwind/
			@item_type_items = Item.advanced_search(@topic_name, @item_type, @length, @quality).paginate(page: params[:page])
		else
			# @item_type_items = @topic.advanced_search(@item_type, @length, @quality)
			@topics = Topic.eager_load(:items).where("items.item_type_id=?", @item_type.id).order(:name).paginate(page: params[:page])
			flash.now[:danger] = "No Topics and Items" if @topics.blank?
		end
	end

	def index
	end

	def discover
		item_type = ItemType.discover
		if item_type
		  redirect_to item_type
		else
		  flash[:danger] = "No formats exist."
		  redirect_to root_path
		end
	end
end
