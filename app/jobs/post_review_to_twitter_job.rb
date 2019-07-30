class PostReviewToTwitterJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
	    review = Review.find(review_id)
	    user = review.user
	    star_rating = ("⭐" * rev.overall_score.to_i)
	    message = "#{star_rating}: #{review.item.display_name} \n #{review.notes[0..30]}... \n\n See more at #{url_for(review.item)}"
	    Auth0Client.post_tweet(user, message)
	rescue Exception => ex
		Rails.logger.error("Error in PostReviewToTwitterJob: #{ex.message}")
	end
  end
end
