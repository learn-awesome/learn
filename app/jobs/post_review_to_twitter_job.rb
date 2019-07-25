class PostReviewToTwitterJob < ApplicationJob
  queue_as :default

  def perform(user_id, review_id)
    user = User.find(user_id)
    review = Review.find(review_id)
    message = "#{user.nickname} just posted a review about #{review.item.name}"
    Auth0Client.post_tweet(user, message)
  end
end
