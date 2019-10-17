class IdeaSetsController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update]

  def new
  	@idea_set = IdeaSet.new
  	@idea_set.items.build
  	@idea_set.items.first.links.build
  end

  def create
  	idea_set = IdeaSet.new(params[:idea_set])
  end

  def edit
    @idea_set = IdeaSet.find(params[:id])
  end

  def update
    @idea_set = IdeaSet.find(params[:id])
  end
end