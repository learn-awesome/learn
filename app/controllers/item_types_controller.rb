class ItemTypesController < ApplicationController
	def show
		@item_type = ItemType.find(params[:id])
	end
end
