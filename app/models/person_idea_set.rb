class PersonIdeaSet < ApplicationRecord
	belongs_to :person
	belongs_to :idea_set
	validates :person, presence: true
	validates :idea_set, presence: true
end