# == Schema Information
#
# Table name: activity_pub_followers
#
#  id         :uuid             not null, primary key
#  user_id    :uuid             not null
#  metadata   :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'json'
require 'httparty'

class ActivityPubFollower < ApplicationRecord
  belongs_to :user
  validates_presence_of :user
  validates_presence_of :metadata
  validates_uniqueness_of :metadata # doesn't work with json type, hence text

  def inbox
    data = JSON.parse(self.metadata)
    actor = JSON.parse(HTTParty.get(data["actor"], headers: {'Accept': 'application/json'}).body.to_s)
    full_inbox = actor["inbox"]
  end

  def actor
    data = JSON.parse(self.metadata)
    data["actor"]
  end

  def ap_url
    self.actor
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
      "actor": Rails.application.routes.url_helpers.actor_user_url(self.user),

      "object": {
        "type": data["type"],
        "actor": data["actor"],
        "object": data["object"]
      }
    }

    full_inbox = self.inbox
    date = Time.now.utc.httpdate

    signature_header = ActivityPub.sign(
      Rails.application.routes.url_helpers.actor_user_url(self.user),
      URI.parse(full_inbox).path,
      URI.parse(full_inbox).host,
      date,
      ENV['ACTIVITYPUB_PRIVKEY'].to_s,
      "SHA-256=#{Digest::SHA256.base64digest(doc.to_json)}"
    )

    HTTParty.post(full_inbox,
      body: doc.to_json,
      headers: { 'Date': date, 'Signature': signature_header , 'Content-Type': 'application/json', 'Digest': "SHA-256=#{Digest::SHA256.base64digest(doc.to_json)}"}
    )
  end

  def accept_unfollow_request!
    #TODO
  end
end
