require 'json'

class User < ApplicationRecord
	validates :nickname, presence: true
	validates :authinfo, presence: true
	validates :auth0_uid, presence: true

	has_many :user_topics
	has_many :reviews
	has_many :submissions, class_name: "Item"

	def auth0
		JSON.parse(self.authinfo)
	end

	def fav_topics
		user_topics.map(&:topic)
	end
end
