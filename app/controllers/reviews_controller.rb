class ReviewsController < ApplicationController
	include Secured
  	before_action :logged_in_using_omniauth?

	def edit
		@review = Review.where(user: current_user).where(id: params[:id]).first
	end

	def update
		@review = Review.where(user: current_user).where(id: params[:id]).first
		@review.status = params[:review][:status]
		@review.inspirational_score = params[:review][:inspirational_score]
		@review.educational_score = params[:review][:educational_score]
		@review.challenging_score = params[:review][:challenging_score]
		@review.entertaining_score = params[:review][:entertaining_score]
		@review.visual_score = params[:review][:visual_score]
		@review.interactive_score = params[:review][:interactive_score]
		@review.notes = params[:review][:notes]
		if @review.save
			redirect_to item_path(@review.item)
		else
			flash[:error] = @review.errors.first
			redirect_back fallback_location: root_path
		end
	end

	def new
		@review = Review.new(user: current_user, item_id: params[:item_id])
	end

	def create
		@review = Review.new
		@review.user = current_user
		@review.item_id = params[:review][:item_id]
		@review.status = params[:review][:status]
		@review.inspirational_score = params[:review][:inspirational_score]
		@review.educational_score = params[:review][:educational_score]
		@review.challenging_score = params[:review][:challenging_score]
		@review.entertaining_score = params[:review][:entertaining_score]
		@review.visual_score = params[:review][:visual_score]
		@review.interactive_score = params[:review][:interactive_score]
		@review.notes = params[:review][:notes]
		if @review.save
			redirect_to item_path(@review.item)
		else
			flash[:error] = @review.errors.first
			redirect_back fallback_location: root_path
		end
	end
end