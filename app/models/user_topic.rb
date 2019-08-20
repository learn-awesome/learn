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

# This model allows one user to create a relation between a user (either self or other) and a topic.
# The relationship label is called :action. A numeric score is possible. 
# by_user is not always needed. (user_id, by_user_id, action) has a unique index.

# (1) A user can "follow" a topic. by_user is null as user is sufficient.
# (2) user A can "rate" user B on a topic. A and B may be same or different.


class UserTopic < ApplicationRecord
	belongs_to :user, inverse_of: :user_topics
	belongs_to :topic, inverse_of: :user_topics
	validates :user_id, presence: true
	validates :topic_id, presence: true
	validates :action, presence: true
	belongs_to :by_user, class_name: "User", optional: true

	validates_uniqueness_of :user_id, :scope => [:topic_id, :action]

	def is_owned_by?(user)
		(self.user == user) || (self.by_user == user)
	end
end
