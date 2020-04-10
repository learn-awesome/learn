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

		user.social_logins.each do |sl|
			if sl.is_from_twitter? and sl.post_reviews
				if ENV.has_key?("TWITTER_CONSUMER_KEY") && ENV.has_key?("TWITTER_CONSUMER_SECRET")
					message = review.tweet_msg
					Auth0Client.post_tweet(sl, message)
					posted = true
				end
			end

			if sl.is_from_linkedin? and sl.post_reviews
				if ENV.has_key?("LINKEDIN_CONSUMER_KEY") && ENV.has_key?("LINKEDIN_CONSUMER_SECRET")
					# payload = review.linkedin_payload
					# Auth0Client.post_linkedin_share(sl, payload)
					# posted = true
				end
			end
		end

		if user.is_goodreads_connected?
			if ENV.has_key?("GOODREADS_CLIENTID") && ENV.has_key?("GOODREADS_CLIENTSECRET")
				consumer = OAuth::Consumer.new(
					ENV['GOODREADS_CLIENTID'],
					ENV['GOODREADS_CLIENTSECRET'],
					:site => 'https://www.goodreads.com')
				token = JSON.parse(user.goodreads_token)["token"]
				secret = JSON.parse(user.goodreads_token)["secret"]
				access_token = OAuth::AccessToken.new(consumer, token, secret)
				access_token.post('/user_status.xml', {
					'user_status[body]' => review.goodreads_msg
				})
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
