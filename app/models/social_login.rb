# == Schema Information
#
# Table name: social_logins
#
#  id           :uuid             not null, primary key
#  auth0_uid    :string
#  auth0_info   :json
#  post_reviews :boolean          default("true"), not null
#  user_id      :uuid             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class SocialLogin < ApplicationRecord
  belongs_to :user
  validates :auth0_info, presence: true
  validates :auth0_uid, presence: true
  validates :user, presence: true

	def is_from_twitter?
		self.auth0_uid.to_s.start_with?("twitter|")
	end

	def is_from_google?
		self.auth0_uid.to_s.start_with?("google-oauth2|")
	end

	def is_from_linkedin?
		self.auth0_uid.to_s.start_with?("linkedin|")
	end

	def is_from_goodreads?
		self.auth0_uid.include?("oauth1") and self.auth0_uid.include?("goodreads")
	end

	def is_from_github?
		self.auth0_uid.include?("github")
	end

	def linkedin_person_urn
		self.auth0_uid.to_s.gsub("linkedin|","") if self.is_from_linkedin?
	end

	def email
		self.auth0["info"]["email"]
	end

	def email=(val)
		# TO fill in missing email for old users
		data = self.auth0
		data["info"]["email"] = val
		self.auth0_info = data.to_json
	end

	def auth0
		JSON.parse(self.auth0_info)
	end
end
