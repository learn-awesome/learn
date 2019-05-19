class TopicIdeaSet < ApplicationRecord
	belongs_to :topic
	belongs_to :idea_set
	validates :topic, presence: true
	validates :idea_set, presence: true
end