class CollectionItem < ApplicationRecord
  belongs_to :collection, inverse_of: :collection_items
  belongs_to :item
  validates :collection, presence: true
  validates :item, presence: true
end