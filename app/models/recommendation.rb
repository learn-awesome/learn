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

class Recommendation < ApplicationRecord
  belongs_to :idea_set

  # one of the 2 below will be present
  belongs_to :item, optional: true
  belongs_to :person, optional: true

  belongs_to :user

  validates_presence_of :idea_set_id

  validate :expert_or_item_required

  def expert_or_item_required
    errors.add("Expert or Item", "must be present.") if item_id.blank? && person_id.blank?
  end

  def display_name
  	self.target.display_name
  end

  def target
  	self.person or self.item
  end
end
