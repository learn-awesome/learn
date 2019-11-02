class PostReviewToTwitterJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
	    review = Review.find(review_id)
	    user = review.user

	    return unless Rails.env.production?
	    return if review.is_posted_on_social_media
	    return unless user.is_from_twitter?
	    return unless user.post_reviews_to_twitter
	    return if review.overall_score.nil? and review.notes.blank? # neither star ratings nor notes are given

	    message = review.tweet_msg
	    Auth0Client.post_tweet(user, message)
	    review.is_posted_on_social_media = true
	    review.save
	rescue Exception => ex
		Rails.logger.error("Error in PostReviewToTwitterJob: #{ex.message}")
	end
  end
end
