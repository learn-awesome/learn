require 'json'

class ActivityPubFollower < ApplicationRecord
	belongs_to :user
	validates_presence_of :user
	validates_presence_of :metadata

	def inbox_host
		# /inbox , mastodon.social
		# data = JSON.parse(self.metadata)
		# inbox, host = data["inbox"], data["host"]
		inbox, host = "/inbox", "mastodon.social"
	end

	def accept_follow_request
    	doc = {
	      "@context": "https://www.w3.org/ns/activitystreams",

	      "id": "https://learnawesome.org/post-review-activity-pub/#{self.id}",
	      "type": "Create",
	      "actor": Rails.application.routes.url_helpers.actor_user_url(self),

	      "object": {
	        "id": "https://learnawesome.org/review-activity-pub/#{self.id}",
	        "type": "Note",
	        "published": self.created_at.iso8601,
	        "attributedTo": Rails.application.routes.url_helpers.actor_user_url(self),
	        # "inReplyTo": "https://mastodon.social/@Gargron/100254678717223630",
	        "content": self.tweet_msg,
	        "to": "https://www.w3.org/ns/activitystreams#Public"
	      }
	    }

	    inbox, host = self.inbox_host
	    date = Time.now.utc.httpdate

	    signature_header = ActivityPub.sign(Rails.application.routes.url_helpers.actor_user_url(self.user), inbox, host, date)

	    HTTP.headers({ 'Host': host, 'Date': date, 'Signature': signature_header })
	        .post("https://#{host}#{inbox}", body: document)
	end
end