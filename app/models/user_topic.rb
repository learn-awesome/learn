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
#  value      :integer
#  by_user_id :uuid
#
# Indexes
#
#  index_user_topics_on_by_user_id                         (by_user_id)
#  index_user_topics_on_topic_id                           (topic_id)
#  index_user_topics_on_user_id                            (user_id)
#  index_user_topics_on_user_id_and_by_user_id_and_action  (user_id,by_user_id,action) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (by_user_id => users.id)
#  fk_rails_...  (topic_id => topics.id)
#  fk_rails_...  (user_id => users.id)
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

	validates_uniqueness_of :user_id, :scope => [:topic_id, :action]

	def is_owned_by?(user)
		(self.user == user) || (self.by_user == user)
	end
end
