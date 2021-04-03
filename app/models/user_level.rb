# == Schema Information
#
# Table name: user_levels
#
#  id         :uuid             not null, primary key
#  user_id    :uuid             not null
#  course_id  :uuid             not null
#  level_id   :uuid             not null
#  answer     :text
#  status     :string           not null
#  feedback   :text
#  metadata   :json
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class UserLevel < ApplicationRecord
  belongs_to :user
  belongs_to :course
  belongs_to :level

  after_create :add_user_to_chat_room

  def submit!
    self.status = 'submitted'
    self.save!
  end

  def accept!
    self.status = 'accepted'
    self.save!
    # move this user as pending on the next level
    self.course.next_user_level(self.user).tap { |ul| ul.save! if ul }
  end

  def reject!
    self.status = 'rejected'
    self.save!
  end

  def is_link_submission?
    self.level.answer_type == 'url' && self.answer.present?
  end

  def add_user_to_chat_room
    # called after UserLevel is created
    # https://developer.rocket.chat/api/rest-api/methods/groups/invite
    return unless User.rocketchat_integration_enabled? && self.persisted?
    User.get_rocketchat_admin_token
    token = self.user.create_or_login_rocketchat # Ensure student is signed up in rocketchat
    chat_server = 'https://chat.learnawesome.org'
    resp = HTTParty.post(
			chat_server + '/api/v1/groups.invite', 
			body: {
				roomId: self.level.get_rocketchat_channel_id,
        userId: self.user.get_rocketchat_user_id
			}.to_json, 
			headers: {
				'X-Auth-Token' => ENV['ROCKETCHAT_ADMIN_AUTHTOKEN'],
				'X-User-Id' => ENV['ROCKETCHAT_ADMIN_USERID'],
				'Content-Type' => 'application/json'
			}
		)
  rescue Exception => ex
    Rails.logger.error "Error in UserLevel#add_user_to_chat_room for #{self.id}: #{ex.message} #{resp.try(:code)} #{resp.try(:body)}"
  end
end
