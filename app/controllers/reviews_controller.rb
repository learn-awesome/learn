class ReviewsController < ApplicationController
	include Secured
  	before_action :logged_in_using_omniauth?, except: [:show, :tweet]

  	def show
  		@review = Review.find(params[:id])
  		@item = @review.item
  		@my_review = Review.where(item: @item, user: current_user).first || Review.new
  	end

	def edit
		@review = Review.where(user: current_user).where(id: params[:id]).first
	end

	def update
		@review = Review.where(user: current_user).where(id: params[:id]).first
		if params[:review].has_key?(:status)
			if params[:review][:status].empty?
				@review.status = nil
			else
				@review.status = params[:review][:status]
			end
		end
		@review.inspirational_score = params[:review][:inspirational_score] if params[:review].has_key?(:inspirational_score)
		@review.educational_score = params[:review][:educational_score] if params[:review].has_key?(:educational_score)
		@review.challenging_score = params[:review][:challenging_score] if params[:review].has_key?(:challenging_score)
		@review.entertaining_score = params[:review][:entertaining_score] if params[:review].has_key?(:entertaining_score)
		@review.visual_score = params[:review][:visual_score] if params[:review].has_key?(:visual_score)
		@review.interactive_score = params[:review][:interactive_score] if params[:review].has_key?(:interactive_score)
		@review.overall_score = params[:review][:overall_score] if params[:review].has_key?(:overall_score)
		@review.notes = params[:review][:notes] if params[:review].has_key?(:notes)
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
		@review.overall_score = params[:review][:overall_score]
		@review.notes = params[:review][:notes]
		if @review.save
			redirect_to item_path(@review.item)
		else
			flash[:danger] = @review.errors.first
			redirect_back fallback_location: root_path
		end
	end

	def tweet
		@review = Review.find(params[:id])
		@tweet = @review.tweet_msg
	end
end