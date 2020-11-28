require 'json'

class TwitterBotJob < ApplicationJob
  queue_as :default

  def perform(event_string)
    event = JSON.parse(event_string)
    Rails.logger.info "In TwitterBotJob"
    Rails.logger.info event_string
  end
end
