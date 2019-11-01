class PostReviewToTwitterJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
	    review = Review.find(review_id)
	    user = review.user
	    star_rating = review.display_rating
	    message = "#{star_rating}: #{review.item.display_name} \n #{review.notes[0..30]}... \n\n See more at #{url_for(review)}"
	    Auth0Client.post_tweet(user, message)
	    review.is_posted_on_social_media = true
	    review.save
	rescue Exception => ex
		Rails.logger.error("Error in PostReviewToTwitterJob: #{ex.message}")
	end
  end
end
