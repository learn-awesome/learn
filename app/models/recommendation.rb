# == Schema Information
#
# Table name: recommendations
#
#  id          :uuid             not null, primary key
#  idea_set_id :uuid             not null
#  metadata    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  item_id     :uuid
#  person_id   :uuid
#  url         :string
#  notes       :text
#  score       :decimal(3, 2)
#
# Indexes
#
#  index_recommendations_on_idea_set_id  (idea_set_id)
#
# Foreign Keys
#
#  fk_rails_...  (idea_set_id => idea_sets.id)
#

class Recommendation < ApplicationRecord
  belongs_to :idea_set

  # one of the 2 below will be present
  belongs_to :item, optional: true
  belongs_to :person, optional: true

  def display_name
  	self.target.display_name
  end

  def target
  	self.person or self.item
  end
end
