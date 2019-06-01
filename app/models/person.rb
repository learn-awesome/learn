class Person < ApplicationRecord
	has_many :person_idea_sets
	has_many :idea_sets, :through => :person_idea_sets
end
