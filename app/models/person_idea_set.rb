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
# Indexes
#
#  index_person_idea_sets_on_idea_set_id  (idea_set_id)
#  index_person_idea_sets_on_person_id    (person_id)
#
# Foreign Keys
#
#  fk_rails_...  (idea_set_id => idea_sets.id)
#  fk_rails_...  (person_id => people.id)
#

class PersonIdeaSet < ApplicationRecord
	belongs_to :person, inverse_of: :person_idea_sets
	belongs_to :idea_set, inverse_of: :person_idea_sets
	validates :person, presence: true
	validates :idea_set, presence: true
end
