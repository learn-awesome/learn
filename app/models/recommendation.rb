# == Schema Information
#
# Table name: recommendations
#
#  id          :uuid             not null, primary key
#  item_id     :uuid             not null
#  person_id   :uuid             not null
#  idea_set_id :uuid             not null
#  metadata    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Recommendation < ApplicationRecord
  belongs_to :idea_set

  # one of the 2 below will be present
  belongs_to :item
  belongs_to :person

  def display_name
  	self.target.display_name
  end

  def target
  	self.person or self.item
  end
end
