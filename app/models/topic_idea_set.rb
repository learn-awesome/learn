# == Schema Information
#
# Table name: topic_idea_sets
#
#  id          :uuid             not null, primary key
#  topic_id    :uuid             not null
#  idea_set_id :uuid             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class TopicIdeaSet < ApplicationRecord
	belongs_to :topic
	belongs_to :idea_set
	validates :topic, presence: true
	validates :idea_set, presence: true
end
