# == Schema Information
#
# Table name: collection_items
#
#  id            :uuid             not null, primary key
#  collection_id :uuid             not null
#  item_id       :uuid             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_collection_items_on_collection_id  (collection_id)
#  index_collection_items_on_item_id        (item_id)
#
# Foreign Keys
#
#  fk_rails_...  (collection_id => collections.id)
#  fk_rails_...  (item_id => items.id)
#

class CollectionItem < ApplicationRecord
  belongs_to :collection, inverse_of: :collection_items
  belongs_to :item
  validates :collection, presence: true
  validates :item, presence: true
end
