require 'httparty'

class GitterNotifyJob < ApplicationJob
  queue_as :default

  def perform(message, room_id = '5ca7a4aed73408ce4fbced18')
    return if ENV['GITTER_TOKEN'].blank?
    return if room_id.blank?
    # return unless Rails.env.production?

    # curl -X POST -i -H "Content-Type: application/json" -H "Accept: application/json" -H "Authorization: Bearer token" "https://api.gitter.im/v1/rooms/5ca7a4aed73408ce4fbced18/chatMessages" -d '{"text":"Testing Gitter API"}'
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
