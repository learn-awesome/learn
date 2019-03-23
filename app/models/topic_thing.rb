class TopicThing < ApplicationRecord
	belongs_to :topic
	belongs_to :thing
	validates :topic, presence: true
	validates :thing, presence: true
end