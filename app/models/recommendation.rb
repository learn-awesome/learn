class Recommendation < ApplicationRecord
  belongs_to :item
  belongs_to :idea_set
  belongs_to :person
end
