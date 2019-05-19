class Topic < ApplicationRecord
	validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 3..30 }
	has_many :topic_idea_sets
	has_many :idea_sets, :through => :topic_idea_sets
end
