class CollectionsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update, :destroy]
  custom_actions :resource => :toggle_item

  belongs_to :user

  def create
  	@collection = Collection.new(params[:collection])
  	@collection.user = current_user
  	create!
  end

  def destroy
  	if resource.user != current_user
  		render :file => "public/422.html", status: :nauthorized
  	else
  		destroy!
  	end
  end

  def update
  	if resource.user != current_user
  		render :file => "public/422.html", status: :nauthorized
  	else
  		update!
  	end
  end

  def toggle_item
    if resource.user != current_user
      render :file => "public/422.html", status: :nauthorized
    else
      item = Item.find(params[:item_id])
      collection_item = resource.collection_items.where(item_id: params[:item_id]).first
      if collection_item.present?
        collection_item.destroy
      else
        CollectionItem.create!(item_id: params[:item_id], collection: resource)
      end
    end
    redirect_to item_path(item, open_status_menu: true)
  end

  private
  def collection_params
  	params.require(:collection).permit(:name, :description)
  end
end