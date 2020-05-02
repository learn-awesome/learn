class ItemTypesController < ApplicationController
	def show
		@item_type = ItemType.find(params[:id])
		@topics = Topic.eager_load(:items).where("items.item_type_id=?", @item_type.id).order(:name).paginate(page: params[:page])
		flash.now[:danger] = "No Topics and Items" if @topics.blank?
	end

	def index
	end
end
