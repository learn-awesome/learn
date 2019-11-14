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
end