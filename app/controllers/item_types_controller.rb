class ItemTypesController < ApplicationController
	def show
		@item_type = ItemType.find(params[:id])
		@topics = Topic.joins(items: :item_type).where(item_types: {id: @item_type.id}).order(:name).includes(:items).paginate(page: params[:page])
		flash.now[:danger] = "No Topics and Items" if @topics.blank?

	end
end
