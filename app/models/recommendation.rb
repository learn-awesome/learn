class Recommendation < ApplicationRecord
  belongs_to :item
  belongs_to :person
  belongs_to :from_item, class_name: "Item", foreign_key: true
end
