# == Schema Information
#
# Table name: users
#
#  id                      :uuid             not null, primary key
#  nickname                :string           not null
#  auth0_uid               :string           not null
#  authinfo                :text             not null
#  image_url               :string
#  bio                     :string
#  description             :text
#  score                   :integer          default(100), not null
#  role                    :string           default("regular"), not null
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  random_fav_topic        :boolean          default(FALSE), not null
#  random_fav_item_types   :string
#  referrer                :string
#  post_reviews_to_twitter :boolean          default(FALSE), not null
#

require 'json'

class User < ApplicationRecord
	validates :nickname, presence: true
	validates :authinfo, presence: true
	validates :auth0_uid, presence: true

	validates_length_of :nickname, in: 4..20, allow_blank: false
	validates_length_of :bio, maximum: 140
	validates_length_of :description, maximum: 400

	validates_format_of :nickname, with: /\A[a-zA-Z][a-zA-Z0-9\_.\-]+\Z/

	has_many :user_topics, dependent: :destroy, inverse_of: :user
	has_many :reviews, dependent: :destroy, inverse_of: :user
	has_many :submissions, class_name: "Item"

	has_many :from_user_relations, foreign_key: :from_user_id, class_name: "UserUserRelation"
	has_many :following, through: :from_user_relations, source: :to_user

	has_many :to_user_relations, foreign_key: :to_user_id, class_name: "UserUserRelation"
	has_many :followers, through: :to_user_relations, source: :from_user

	def auth0
		JSON.parse(self.authinfo)
	end

	def fav_topics
		user_topics.map(&:topic)
	end

	def is_admin?
		self.role == "admin"
	end

	def is_from_twitter?
		self.auth0_uid.to_s.start_with?("twitter|")
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

	def invited
		User.where(referrer: self.id.to_s.split("-").first)
	end

	def self.calculate_points
		User.all.each do |u|
			u.score = 0
			# points for signing up (early)
			u.score += ('2019-12-31'.to_date - u.created_at.to_date).to_i

			# points for submitting links: TODO- take quality into account
			u.score += u.submissions.count * 10

			# points for submitting reviews: TODO- take quality into account
			u.score += u.reviews.count * 10

			# points for adding item metadata
			#TODO

			# points for inviting users
			u.score += u.invited.count * 50

			# points for correcting data / flagging items
			# TODO

			# points for developer contribution
			if User.core_devs.include?(u.id)
				u.score += 5000
			end

			# points for financial contribution
			# eshnil for domain, heroku hosting etc
			if ['58175aad-22f9-4a40-a6d0-b665762c8f8d'].include?(u.id)
				u.score += 5000
			end

			# For paid plans, gift etc: #TODO

			# For local testing
			if Rails.env.development? and User.order(:created_at).take(5).map(&:id).include?(u.id)
				u.score += 10_000
			end

			u.save
		end
	end

	def self.core_devs
		[
			'58175aad-22f9-4a40-a6d0-b665762c8f8d',
			'321d1985-4713-41f4-8d9d-069e48ebf2de',
			'02e667dc-08c9-4663-a139-c01abe83f8b8',
			'a7586583-51b2-4715-87f8-85d506fd3af2',
			'8a16a2e4-dcb7-4167-a2a2-51d3af9d1613'
		]
	end

	def can_combine_items?
		self.score.to_i >= 5000
	end

	def can_see_metrics?
		self.score.to_i >= 5000
	end

	def email
		self.auth0["info"]["email"]
	end
end
