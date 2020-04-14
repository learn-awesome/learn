require 'httparty'

class GitterCreateRoomJob < ApplicationJob
  queue_as :default

  def perform(topic_id)
    return if ENV['GITTER_ADMIN_TOKEN'].blank?
    return if room_id.blank?
    return unless Rails.env.production?

    topic = Topic.find(topic_id)

    return if topic.nil?

    # Docs at https://developer.gitter.im/docs/groups-resource
    begin
      resp = HTTParty.post(
        "https://api.gitter.im/v1/groups/5ca7a4aed73408ce4fbced16/rooms",
        headers: {
          "Content-Type" => "application/json",
          "Accept" => "application/json",
          "Authorization" => "Bearer " + ENV['GITTER_ADMIN_TOKEN']
        },
        body: {
            "name" => topic.name.gsub("/","-"),
            "topic" => "Discussions about #{topic.display_name}",
            "security" => {"type"=>"GROUP", "linkPath"=>nil, "security"=>"PUBLIC"}
        }.to_json
      )
      if resp.code >= 200 and resp.code < 300
        data = JSON.parse(resp.body)
        #TODO: extract room ID and save it in Topic
        # {"id":"5e960c97d73408ce4fe06e88","name":"learn-awesome/economics","topic":"Discussions about economics","avatarUrl":"https://avatars-02.gitter.im/group/iv/4/5ca7a4aed73408ce4fbced16","uri":"learn-awesome/economics","oneToOne":false,"userCount":0,"unreadItems":0,"mentions":0,"lastAccessTime":"2020-04-14T19:19:00.088Z","lurk":true,"url":"/learn-awesome/economics","githubType":"REPO_CHANNEL","security":"PUBLIC","noindex":false,"tags":[],"roomMember":true,"groupId":"5ca7a4aed73408ce4fbced16","group":{"id":"5ca7a4aed73408ce4fbced16","name":"learn-awesome","uri":"learn-awesome","homeUri":"learn-awesome","backedBy":{"type":null},"avatarUrl":"https://avatars-02.gitter.im/group/iv/4/5ca7a4aed73408ce4fbced16"},"backend":{"type":"GROUP"},"public":true,"meta":{},"extra":{}}
        topic.update!(gitter_room: topic.name.gsub("/","-"), gitter_room_id: data["id"])
      end
    rescue => exception
      Rails.logger.error "Error #{exception.message} while creating gitter room for Topic: #{topic_id}"
    end
  end
end
