require 'slack-ruby-client'

class SlackNotifyJob < ApplicationJob
  queue_as :default

  def perform(message, room_id)
    return if ENV['SLACK_API_TOKEN'].blank?
    return if room_id.blank?
    return if message.blank?
    return unless Rails.env.production?

    # https://github.com/slack-ruby/slack-ruby-client
    begin
      Slack.configure do |config|
        config.token = ENV['SLACK_API_TOKEN']
      end

      client = Slack::Web::Client.new

      client.chat_postMessage(channel: "##{room_id}", text: message, as_user: true)
    rescue => exception
      Rails.logger.error "Error #{exception.message} while notifying Slack"
    end
  end
end
