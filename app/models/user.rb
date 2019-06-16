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
#  role        :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'json'

class User < ApplicationRecord
	validates :nickname, presence: true
	validates :authinfo, presence: true
	validates :auth0_uid, presence: true

	validates_length_of :nickname, in: 4..20, allow_blank: false
	validates_length_of :bio, maximum: 140
	validates_length_of :description, maximum: 400

	validates_format_of :nickname, with: /\A[a-z][a-z0-9.\-]+[a-z0-9]\Z/

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

	def get_reviews(item_type, status)
		results = self.reviews
		if status.present?
			results = results.where(status: status)
		end

		results = results.all.to_a

		if item_type.present?
			results = results.select { |r| r.item.item_type_id == item_type_id }
		end
		return results
	end
end
