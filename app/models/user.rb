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

	has_many :user_topics, dependent: :destroy, inverse_of: :user
	has_many :reviews, dependent: :destroy, inverse_of: :user
	has_many :submissions, class_name: "Item"

	has_many :following, through: :from_user_relations, source: :from_user
	has_many :from_user_relations, foreign_key: :from_user_id, class_name: "UserUserRelation"

	has_many :followers, through: :to_user_relations, source: :to_user
	has_many :to_user_relations, foreign_key: :to_user_id, class_name: "UserUserRelation"

	def auth0
		JSON.parse(self.authinfo)
	end

	def fav_topics
		user_topics.map(&:topic)
	end

	def is_admin?
		self.role == "admin"
	end

	def get_reviews(item_type, status, quality = nil, min_quality_score = 0)
		results = self.reviews
		if status.present?
			results = results.where(status: status)
		end

		if quality and min_quality_score and Review::SCORE_TYPES.include?(quality)
			results = results.where(quality: quality).where("? > ?", "#{quality}_score", min_quality_score)
		end

		results = results.all.to_a

		if item_type.present?
			results = results.select { |r| r.item.item_type_id == item_type_id }
		end
		return results
	end
end
