class PostReviewToSocialMediaJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
	    review = Review.find(review_id)
	    user = review.user

	    return unless Rails.env.production?
	    return if review.is_posted_on_social_media
	    return if review.overall_score.nil? and review.notes.blank? # neither star ratings nor notes are given

		user.social_logins.each do |sl|
			if sl.is_from_twitter? and sl.post_reviews
				if ENV.has_key?("TWITTER_CONSUMER_KEY") && ENV.has_key?("TWITTER_CONSUMER_SECRET")
					message = review.tweet_msg
					Auth0Client.post_tweet(sl, message)
					review.is_posted_on_social_media = true
					review.save
				end
			end

			if sl.is_from_linkedin? and sl.post_reviews
				if ENV.has_key?("LINKEDIN_CONSUMER_KEY") && ENV.has_key?("LINKEDIN_CONSUMER_SECRET")
					# Disabled because Auth0 does not give us write permission
					# payload = review.linkedin_payload
					# Auth0Client.post_linkedin_share(sl, payload)
				end
			end

			if sl.is_from_goodreads? and sl.post_reviews
				if ENV.has_key?("GOODREADS_CLIENTID") && ENV.has_key?("GOODREADS_CLIENTSECRET")
					# GoodReads API key has been deactivated
					# Auth0Client.post_goodreads(sl, review.goodreads_msg)
				end
			end

			# github, google and auth0 or post_review disabled
			
		end

		if user.activity_pub_followers.any?
			user.activity_pub_followers.each do |follower|
				begin
					review.post_activity_pub(follower)
					review.is_posted_on_social_media = true
					review.save
				rescue Exception => ex
					Rails.logger.error("Error #{ex.message} while posting #{review_id} to #{follower.id}")
				end
			end
		end
	    
	rescue Exception => ex
		Rails.logger.error("Error in PostReviewToSocialMediaJob: #{ex.message}")
	end
  end
end
