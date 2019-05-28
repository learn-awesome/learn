require 'json'

class User < ApplicationRecord
	validates :nickname, presence: true
	validates :authinfo, presence: true
	validates :auth0_uid, presence: true

	def auth0
		JSON.parse(self.authinfo)
	end
end
