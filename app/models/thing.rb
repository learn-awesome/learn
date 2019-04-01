class Thing < ApplicationRecord
	validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 8..120 }
	has_many :items
	has_many :topic_things
	has_many :topics, :through => :topic_things
	has_many :person_things
	has_many :people, :through => :person_things
	accepts_nested_attributes_for :items, allow_destroy: true
	accepts_nested_attributes_for :topic_things, allow_destroy: true
	accepts_nested_attributes_for :person_things, allow_destroy: true
end
