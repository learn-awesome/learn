class Person < ApplicationRecord
	has_many :person_things
	has_many :things, :through => :person_things
end
