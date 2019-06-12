# == Schema Information
#
# Table name: users
#
#  id          :uuid             not null, primary key
#  nickname    :string           not null
#  auth0_uid   :string           not null
#  authinfo    :text             not null
#  image_url   :string
#  bio         :string
#  description :text
#  score       :integer          default(100), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

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

	def is_admin?
		self.role == "admin"
	end
end
