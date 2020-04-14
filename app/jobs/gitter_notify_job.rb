require 'httparty'

class GitterNotifyJob < ApplicationJob
  queue_as :default

  def perform(message, room_id)
    return if ENV['GITTER_TOKEN'].blank?
    return if room_id.blank?
    return unless Rails.env.production?

    # https://developer.gitter.im/docs/messages-resource
    begin
      HTTParty.post(
        "https://api.gitter.im/v1/rooms/#{room_id}/chatMessages",
        headers: {
          "Content-Type" => "application/json",
          "Accept" => "application/json",
          "Authorization" => "Bearer " + ENV['GITTER_TOKEN']
        },
        body: {"text" => message}.to_json
      )
    rescue => exception
      Rails.logger.error "Error #{exception.message} while notifying gitter"
    end
  end
end
