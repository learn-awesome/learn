class IdeaSetsController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?, only: [:show, :new, :create, :edit, :update]

  def new
  	@idea_set = IdeaSet.new
  	@idea_set.items.build
  	@idea_set.items.first.links.build
  end

  def show
    @idea_set = IdeaSet.find(params[:id])
    redirect_to @idea_set.items.sample
  end

  def create
  	idea_set = IdeaSet.new(params[:idea_set])
  end

  def edit
    @idea_set = IdeaSet.find(params[:id])

    # User most likely wants to add related items. Build a new object to show in the form
    @idea_set.items.build.links.build

  end

  def update
    @idea_set = IdeaSet.find(params[:id])
    data = idea_set_params

    data[:items_attributes].each do |k,v|
      v[:name] = @idea_set.name if v[:id].blank?
      v[:user_id] = current_user.id if v[:id].blank?
    end
    @idea_set.update!(data)
    redirect_to @idea_set.items.first
  end

  private
  def idea_set_params
    params.require(:idea_set).permit(items_attributes: [
      :id,
      :description,
      :name,
      :item_type_id,
      :_destroy,
      links_attributes: [:id, :_destroy, :url]
    ])
  end
end