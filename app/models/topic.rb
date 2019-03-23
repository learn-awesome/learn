class Topic < ApplicationRecord
	validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 3..30 }
	has_many :topic_things
	has_many :things, :through => :topic_things
end
