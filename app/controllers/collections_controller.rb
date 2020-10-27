class CollectionsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update, :destroy, :import_goodreads_list]
  custom_actions :resource => [:import_goodreads_list, :toggle_item]

  belongs_to :user

  def create
  	@collection = Collection.new(collection_params)
  	@collection.user = current_user
    create! do |format|
      # if an item_id was passed then add that to this newly created collection
      CollectionItem.create!(item_id: collection_params[:item_id], collection: @collection) if collection_params[:item_id].present?
      format.html { redirect_to user_collections_path(@collection.user) }
      format.js { @review = Review.where(item_id: collection_params[:item_id], user: current_user).first || Review.new(item_id: collection_params[:item_id], user: current_user) }
    end
  end

  def destroy
  	if resource.user != current_user
  		render :file => "public/422.html", status: :unauthorized
  	else
  		destroy!
  	end
  end

  def update
  	if resource.user != current_user
  		render :file => "public/422.html", status: :unauthorized
  	else
  		update!
  	end
  end

  def toggle_item
    if resource.user != current_user
      render :file => "public/422.html", status: :unauthorized
    else
      item = Item.find(params[:item_id])
      collection_item = resource.collection_items.where(item_id: params[:item_id]).first
      if collection_item.present?
        collection_item.destroy
      else
        CollectionItem.create!(item_id: params[:item_id], collection: resource)
      end
    end
    respond_to do |format|
      format.html { redirect_to item_path(item, open_status_menu: true) }
      format.js { @review = Review.where(item: item, user: current_user).first || Review.new(item: item, user: current_user) }
    end
  end

  def import_goodreads_list
    if resource.user != current_user
      render :file => "public/422.html", status: :unauthorized
    elsif request.post?
      url = params[:goodreads_list_url].presence
      if url
        ImportGoodreadsListJob.perform_later(url, current_user.id, resource.id)
        flash[:success] = "This list will be imported in some time."
        redirect_to collection_path(resource)
        return
      else
        flash[:danger] = "A valid GoodReads List URL must be given"
        redirect_to import_goodreadsx_list_user_collection_path(current_user, resource)
        return
      end
    end
    # GET request -> show form
  end

  private
  def collection_params
  	params.require(:collection).permit(:name, :description, :goodreads_list_url, :item_id)
  end
end