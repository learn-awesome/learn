require 'slack-ruby-client'

class SlackSubscriptionNotifyJob < ApplicationJob
  queue_as :default

  def perform(message, slack_subscription_id)
    return if message.blank?
    return if slack_subscription_id.blank?
    return unless Rails.env.production?

    # https://github.com/slack-ruby/slack-ruby-client
    begin
      sub = SlackSubscription.find(slack_subscription_id)
      token = sub.access_token

      client = Slack::Web::Client.new(token: token)

      client.chat_postMessage(channel: sub.channel_id, text: message, as_user: true)
    rescue => exception
      Rails.logger.error "Error #{exception.message} while notifying Slack"
    end
  end
end
