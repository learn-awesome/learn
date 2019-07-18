class ItemTypesController < ApplicationController
	def show
		@item_type = ItemType.find(params[:id])
		@items = Item.where(item_type: @item_type).includes(:topics)
		@topics = Topic.order(:name).all
	end
end
