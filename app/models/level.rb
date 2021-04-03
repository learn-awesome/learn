# == Schema Information
#
# Table name: levels
#
#  id            :uuid             not null, primary key
#  name          :string           not null
#  description   :text
#  course_id     :uuid             not null
#  seq           :integer          not null
#  item_type_id  :string
#  link          :string
#  answer_type   :string           not null
#  answer_prompt :text             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Level < ApplicationRecord
  belongs_to :course
  belongs_to :item_type, optional: true
  has_many :user_levels, dependent: :destroy

  validates :name, presence: true
  validates :seq, uniqueness: { scope: :course, message: "must be unique" }
  validates :answer_type, presence: true
  validates :answer_prompt, presence: true

  after_create :create_rocketchat_channel

  def get_idx
    course.levels.index(self) + 1
  end

  def rocketchat_channel_name
    # course_id, course_name, level_id, level_name, seq
    self.course.id.to_s.split("-").first + "-" + self.id.to_s.split("-").first
  end

  def get_rocketchat_channel_id
    # called from UserLevel#add_user_to_chat_room, hence no need to refresh admin token
    chat_server = 'https://chat.learnawesome.org'
    resp = HTTParty.get(
			chat_server + '/api/v1/groups.info', 
			query: {
				roomName: self.rocketchat_channel_name
			},
			headers: {
				'X-Auth-Token' => ENV['ROCKETCHAT_ADMIN_AUTHTOKEN'],
				'X-User-Id' => ENV['ROCKETCHAT_ADMIN_USERID']
			}
		)
    return JSON.parse(resp.body)["group"]["_id"]
  end

  def create_rocketchat_channel
    # called after Level is created
    # https://developer.rocket.chat/api/rest-api/methods/groups/create
    return unless User.rocketchat_integration_enabled? && self.persisted?
    User.get_rocketchat_admin_token
    token = self.course.user.create_or_login_rocketchat
    chat_server = 'https://chat.learnawesome.org'
    resp = HTTParty.post(
			chat_server + '/api/v1/groups.create', 
			body: {
				name: self.rocketchat_channel_name,
        members: [self.course.user.rocketchat_username] # add all teachers to chat room for this level
			}.to_json, 
			headers: {
				'X-Auth-Token' => ENV['ROCKETCHAT_ADMIN_AUTHTOKEN'],
				'X-User-Id' => ENV['ROCKETCHAT_ADMIN_USERID'],
				'Content-Type' => 'application/json'
			}
		)
  rescue Exception => ex
    Rails.logger.error "Error in Level#create_rocketchat_channel for #{self.id}: #{ex.message}"
  end
end
