class Topic < ApplicationRecord
	validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 3..30 }
	has_many :topic_idea_sets
	has_many :idea_sets, :through => :topic_idea_sets
	has_many :items, :through => :idea_sets
	has_many :user_topics

	def self.button_style
		"btn-success"
	end

	def chat_room
		self.gitter_room or self.name.downcase
	end

	def display_name
		if self.namespace.present?
			self.namespace.to_s + "/" + self.name
		else
			self.name
		end
	end
end
