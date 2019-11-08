class CollectionsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update, :destroy]

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

  private
  def collection_params
  	params.require(:collection).permit(:name, :description)
  end
end