class PostReviewToTwitterJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
	    review = Review.find(review_id)
	    user = review.user
	    message = review.tweet_msg
	    Auth0Client.post_tweet(user, message)
	    review.is_posted_on_social_media = true
	    review.save
	rescue Exception => ex
		Rails.logger.error("Error in PostReviewToTwitterJob: #{ex.message}")
	end
  end
end
