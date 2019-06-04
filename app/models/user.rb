require 'json'

class User < ApplicationRecord
	validates :nickname, presence: true
	validates :authinfo, presence: true
	validates :auth0_uid, presence: true

	has_many :user_topics
	has_many :reviews

	def auth0
		JSON.parse(self.authinfo)
	end

	def fav_topics
		user_topics.map(&:topic)
	end

	def bio
		"programmer"
	end

	def description
		"testing"
	end

	def score
		100
	end

	def submissions
		self.reviews
	end
end
