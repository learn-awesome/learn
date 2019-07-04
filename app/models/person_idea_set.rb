# == Schema Information
#
# Table name: person_idea_sets
#
#  id          :uuid             not null, primary key
#  person_id   :uuid             not null
#  idea_set_id :uuid             not null
#  role        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class PersonIdeaSet < ApplicationRecord
	belongs_to :person, inverse_of: :person_idea_sets
	belongs_to :idea_set, inverse_of: :person_idea_sets
	validates :person, presence: true
	validates :idea_set, presence: true
end
