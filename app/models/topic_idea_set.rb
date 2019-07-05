# == Schema Information
#
# Table name: topic_idea_sets
#
#  id          :uuid             not null, primary key
#  topic_id    :uuid             not null
#  idea_set_id :uuid             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  rating      :integer
#

class TopicIdeaSet < ApplicationRecord
	belongs_to :topic, inverse_of: :topic_idea_sets
	belongs_to :idea_set, inverse_of: :topic_idea_sets
	validates :topic, presence: true
	validates :idea_set, presence: true
end
