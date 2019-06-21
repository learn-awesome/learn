# == Schema Information
#
# Table name: topics
#
#  id           :uuid             not null, primary key
#  name         :string           not null
#  search_index :string           not null
#  namespace    :string
#  gitter_room  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Topic < ApplicationRecord
	validates :name, presence: true, uniqueness: { case_sensitive: false, scope: :namespace }, length: { in: 1..50 }
	has_many :topic_idea_sets
	has_many :idea_sets, :through => :topic_idea_sets
	has_many :items, :through => :idea_sets
	has_many :user_topics
	has_many :users, through: :user_topics

	def to_param
		self.id.to_s + "-" + self.name.to_s.parameterize
	end

	def self.from_param(id)
		self.find(id.to_s.split("-")[0..4].join("-"))
	end

	def self.button_style
		"btn-success"
	end

	def chat_room
		#self.gitter_room or self.name.downcase
		'community'
	end

	def display_name
		if self.namespace.present?
			self.namespace.to_s + "/" + self.name
		else
			self.name
		end
	end

	def curators
		self.user_topics.where(action: "curate").collect(&:user)
	end

	def followers
		self.user_topics.where(action: "follow").collect(&:user)
	end
end
