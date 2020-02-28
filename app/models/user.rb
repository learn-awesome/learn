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
#  unsubscribe             :boolean          default(FALSE), not null
#

require 'json'

class User < ApplicationRecord
  has_many :collections
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

	has_many :collections
	has_many :flash_cards

	has_many :activity_pub_followers

	after_create :update_points

	def self.from_param(id)
		self.where(id: id.to_s.split("-")[0..4].join("-")).first
	end

	def auth0
		JSON.parse(self.authinfo)
	end

	def avatar_image
		self.auth0["info"]["image"]
	end

	def update_points
		user = User.where("CAST (id AS TEXT) LIKE '%#{self.referrer}%'").first
		UserPointsService.call(user) if user.present?
	end

	def notifications
		followers = UserUserRelation.where(to_user: self).all
		following = UserUserRelation.where(from_user: self).all
		return followers.map { |f|
			Notification.new(
				headline: "@#{f.from_user.nickname}",
				msg: "started following you",
				image: f.from_user.avatar_image,
				target: f.from_user,
				date: f.created_at.to_date
		)} + following.map { |f|
			Notification.new(
				headline: "You",
				msg: "started following @#{f.to_user.nickname}",
				image: self.avatar_image,
				target: f.to_user,
				date: f.created_at.to_date
		)} + [ Notification.new(
				headline: "LearnAwesome",
				msg: "invites you to learners community",
				image: "/favicon.png",
				target: "https://gitter.im/learn-awesome/community",
				date: "2019-11-01"
		)]
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

	def self.core_devs
		[
			'58175aad-22f9-4a40-a6d0-b665762c8f8d',
			'321d1985-4713-41f4-8d9d-069e48ebf2de',
			'02e667dc-08c9-4663-a139-c01abe83f8b8',
			'a7586583-51b2-4715-87f8-85d506fd3af2',
			'8a16a2e4-dcb7-4167-a2a2-51d3af9d1613'
		]
	end

	def is_core_dev?
		User.core_devs.include?(self.id)
	end

	def can_combine_items?
		self.score.to_i >= 5000
	end

	def can_merge_topic?
		self.score.to_i >= 20000
	end

	def can_see_metrics?
		self.score.to_i >= 5000
	end

	def email
		self.auth0["info"]["email"]
	end

	def self.learnawesome
		User.find_by_nickname('learnawesome')
	end

	def is_goodreads_connected?
		self.goodreads_token.present? and JSON.parse(self.goodreads_token)["type"] == 'access_token'
	end

	def activitypub_id
		id.to_s.gsub("-","_")
	end

	def activitypub_username
		"#{activitypub_id}@learnawesome.org"
	end

	def webfinger_json
		{
			subject: "acct:#{self.activitypub_id}@learnawesome.org",
			links: [
				{
					rel: "self",
					type: "application/activity+json",
					href: Rails.application.routes.url_helpers.actor_user_url(self)
				}
			]
		}
	end

	def actor_json
		# For ActivityPub
		{
			"@context": [
				"https://www.w3.org/ns/activitystreams",
				"https://w3id.org/security/v1"
			],

			"id": Rails.application.routes.url_helpers.actor_user_url(self),
			"type": "Person",
			"preferredUsername": self.activitypub_id.to_s,
			"name": "#{self.nickname} on learnawesome.org",
			"summary": self.bio.to_s,
			"icon": [
			    self.avatar_image.to_s
			  ],

			"inbox": Rails.application.routes.url_helpers.inbox_user_url(self),
			"outbox": Rails.application.routes.url_helpers.outbox_user_url(self, format: :json),

			"publicKey": {
				"id": (Rails.application.routes.url_helpers.actor_user_url(self) + "#main-key"),
				"owner": Rails.application.routes.url_helpers.actor_user_url(self),
				"publicKeyPem": ENV['ACTIVITYPUB_PUBKEY'].to_s
			}
		}
	end

	def add_to_inbox!(all_headers, body)
	  # keyId="https://learnawesome.org/users/8a16a2e4-dcb7-4167-a2a2-51d3af9d1613/actor#main-key",headers="(request-target) host date",signature="..."
	  # {'Host': 'learnawesome.org', 'Date': '2019-11-14T12:39:31+05:30'}
	  inbox_path = Rails.application.routes.url_helpers.inbox_user_path(self)
	  actor_url = Rails.application.routes.url_helpers.actor_user_url(self)
	  body_hash = JSON.parse(body)

	  if body_hash["object"] == actor_url and ActivityPub.verify(nil, all_headers, inbox_path)
	  	if body_hash["type"] == "Follow" # Do this check first
	  		Rails.logger.info "New follow from ActivityPub for #{self.id}"
	  		afp = self.activity_pub_followers.create!(metadata: body)
	  		# Send Accept response
	  		ActivityPubFollowAcceptedJob.perform_later(afp.id)
		elsif body_hash["type"] == "Unollow" # Do this check first
			Rails.logger.info "Unfollow request from ActivityPub for #{self.id}: #{body_hash.inspect}"
		else
	  		Rails.logger.info "Unknown ActivityType for #{self.id}: #{body_hash.inspect}"
	  	end
	  else
	    raise "Request signature could not be verified: #{all_headers.inspect} body=#{body}"
	  end
	end

	def theme_variant
		if false
			:tailwind
		else
			:bootstrap
		end
	end

	def theme_name
		:default
	end
end
