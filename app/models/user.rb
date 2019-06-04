require 'json'

class User < ApplicationRecord
	validates :nickname, presence: true
	validates :authinfo, presence: true
	validates :auth0_uid, presence: true

	has_many :user_topics

	def auth0
		JSON.parse(self.authinfo)
	end
end
