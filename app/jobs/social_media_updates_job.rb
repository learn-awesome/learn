class SocialMediaUpdatesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    return unless ENV.has_key?("TWITTER_CONSUMER_KEY") && ENV.has_key?("TWITTER_CONSUMER_SECRET")
    begin
      sl = SocialLogin.where(auth0_uid: "twitter|1114259648326987776").first # https://learnawesome.org/users/ea1408e5-a98f-41ff-8f81-2e5d55fb034e
      return if sl.nil?
      # post about a random topic or a random item
      topic = Topic.discover
      message = topic.message_for_twitter_update
      Auth0Client.post_tweet(sl, message) if message.present?
    rescue
      nil
    end

    # TODO: Post on LinkedIn, Reddit, Facebook, Slack, Gitter etc.
  end
end
