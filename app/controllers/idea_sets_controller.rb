class IdeaSetsController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create]

  def new
  	@idea_set = IdeaSet.new
  	@idea_set.items.build
  	@idea_set.items.first.links.build
  end

  def create
  	idea_set = IdeaSet.new(params[:idea_set])
  end
end