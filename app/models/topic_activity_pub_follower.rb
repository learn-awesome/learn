# == Schema Information
#
# Table name: topic_activity_pub_followers
#
#  id         :uuid             not null, primary key
#  topic_id   :uuid             not null
#  metadata   :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'json'
require 'httparty'

class TopicActivityPubFollower < ApplicationRecord
  belongs_to :topic
  validates_presence_of :topic
  validates_presence_of :metadata
  validates_uniqueness_of :metadata

  def inbox
    data = JSON.parse(self.metadata)
    actor = JSON.parse(HTTParty.get(data["actor"], headers: {'Accept': 'application/json'}).body.to_s)
    full_inbox = actor["inbox"]
  end

  def actor
    data = JSON.parse(self.metadata)
    data["actor"]
  end

  def object
    data = JSON.parse(self.metadata)
    data["object"]
  end

  def accept_follow_request!
    data = JSON.parse(self.metadata)

    doc = {
      "@context": "https://www.w3.org/ns/activitystreams",
      "type": "Accept",
      "actor": Rails.application.routes.url_helpers.actor_topic_url(self.topic),

      "object": {
        "type": data["type"],
        "actor": data["actor"],
        "object": data["object"]
      }
    }

    full_inbox = self.inbox
    date = Time.now.utc.httpdate

    signature_header = ActivityPub.sign(
      Rails.application.routes.url_helpers.actor_topic_url(self.topic),
      URI.parse(full_inbox).path,
      URI.parse(full_inbox).host,
      date,
      ENV['ACTIVITYPUB_PRIVKEY'].to_s
    )

    HTTParty.post(full_inbox,
      body: doc.to_json,
      headers: { 'Date': date, 'Signature': signature_header , 'Content-Type': 'application/json'}
    )
  end

  def accept_unfollow_request!
    #TODO
  end
end
