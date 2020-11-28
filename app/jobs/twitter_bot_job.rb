require 'json'

class TwitterBotJob < ApplicationJob
  queue_as :default

  def perform(event_string)
    # TODO: Listen for mentions, look up the link in the parent tweet and add topic/item as needed.
    event = JSON.parse(event_string)
    Rails.logger.info "In TwitterBotJob"
    Rails.logger.info event_string
    return unless event["for_user_id"] == "1114259648326987776"
    return unless event["tweet_create_events"] # new tweet created
    return unless event["is_blocked_by"] # mentioned by another user
  end
end
