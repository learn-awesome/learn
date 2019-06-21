# == Schema Information
#
# Table name: user_topics
#
#  id         :uuid             not null, primary key
#  user_id    :uuid             not null
#  topic_id   :uuid             not null
#  action     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserTopic < ApplicationRecord
	belongs_to :user
	belongs_to :topic
	validates :user_id, presence: true
	validates :topic_id, presence: true
	validates :action, presence: true

	validates_uniqueness_of :user_id, :scope => [:topic_id, :action]
end
