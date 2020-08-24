require 'slack-ruby-client'

class SocialMediaUpdatesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    begin

      # post about a random topic or a random item
      topic = Topic.discover_with_items
      message = topic.message_for_twitter_update

      if ENV.has_key?("TWITTER_CONSUMER_KEY") && ENV.has_key?("TWITTER_CONSUMER_SECRET")
        sl = SocialLogin.where(auth0_uid: "twitter|1114259648326987776").first # https://learnawesome.org/users/ea1408e5-a98f-41ff-8f81-2e5d55fb034e
        return if sl.nil?
        Auth0Client.post_tweet(sl, message) if message.present?
      end

      if ENV.has_key?("SLACK_API_TOKEN")
        Slack.configure do |config|
          config.token = ENV['SLACK_API_TOKEN']
        end

        client = Slack::Web::Client.new

        client.chat_postMessage(channel: '#general', text: message, as_user: true)
      end
    rescue
      nil
    end

    # TODO: Post on LinkedIn, Reddit, Facebook, Slack, Gitter etc.
  end
end
