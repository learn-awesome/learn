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

class CollectionItem < ApplicationRecord
  belongs_to :collection, inverse_of: :collection_items
  belongs_to :item
  validates :collection, presence: true
  validates :item, presence: true
end
