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
