class SocialLogin < ApplicationRecord
  belongs_to :user
	validates :auth0_info, presence: true
  validates :auth0_uid, presence: true
  validates :user, presence: true
end
