class PostReviewToSocialMediaJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
	    review = Review.find(review_id)
	    user = review.user

	    return unless Rails.env.production?
	    return if review.is_posted_on_social_media
	    return if review.overall_score.nil? and review.notes.blank? # neither star ratings nor notes are given
	    posted = false

	    if user.is_from_twitter? and user.post_reviews_to_twitter
	    	if ENV.has_key?("TWITTER_CONSUMER_KEY") && ENV.has_key?("TWITTER_CONSUMER_SECRET")
			    message = review.tweet_msg
			    Auth0Client.post_tweet(user, message)
			    posted = true
			end
		end

		if user.activity_pub_followers.any?
			user.activity_pub_followers.each do |follower|
				begin
					review.post_activity_pub(follower)
					posted = true
				rescue Exception => ex
					Rails.logger.error("Error #{ex.message} while posting #{review_id} to #{follower.id}")
				end
			end
		end

	    review.is_posted_on_social_media = posted
	    review.save
	    
	rescue Exception => ex
		Rails.logger.error("Error in PostReviewToSocialMediaJob: #{ex.message}")
	end
  end
end
