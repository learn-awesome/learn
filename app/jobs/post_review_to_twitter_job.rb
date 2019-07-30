class PostReviewToTwitterJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
	    review = Review.find(review_id)
	    user = review.user
	    message = "#{user.nickname} just posted a review about #{review.item.name}"
	    Auth0Client.post_tweet(user, message)
	rescue Exception => ex
		Rails.logger.error("Error in PostReviewToTwitterJob: #{ex.message}")
	end
  end
end
