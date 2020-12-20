# == Schema Information
#
# Table name: idea_sets
#
#  id          :uuid             not null, primary key
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :text
#

class IdeaSet < ApplicationRecord
	validates :name, presence: true, length: { in: 3..260 }
	has_many :items, dependent: :destroy, inverse_of: :idea_set
	has_many :topic_idea_sets, dependent: :destroy, inverse_of: :idea_set
	has_many :topics, :through => :topic_idea_sets
	has_many :person_idea_sets, dependent: :destroy, inverse_of: :idea_set
	has_many :people, :through => :person_idea_sets
	has_many :recommendations, dependent: :destroy, inverse_of: :idea_set
	validates :items, presence: true, on: :update # idea_set is saved before items
	validates :topic_idea_sets, presence: true, on: :update # see items_controller#72
	accepts_nested_attributes_for :items, allow_destroy: true
	accepts_nested_attributes_for :topic_idea_sets, allow_destroy: true
	accepts_nested_attributes_for :person_idea_sets, allow_destroy: true
	accepts_nested_attributes_for :recommendations, allow_destroy: true

	def review
		Review.new
	end
	
	def review_attributes=(attributes)
	end

	def display_name
		name
	end

	def as_json(options = {})
		super(
			only: [:id, :name],
			include: {
				items: { only: [:id, :name, :item_type_id, :image_url, :description, :overall_score], include: { links: {only: [:url] }} },
				topic_idea_sets: { only: [:topic_id] } 
			}
		)
	end
end
