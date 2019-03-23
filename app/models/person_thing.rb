class PersonThing < ApplicationRecord
	belongs_to :person
	belongs_to :thing
	validates :person, presence: true
	validates :thing, presence: true
end