class Collection < ApplicationRecord
  belongs_to :user, inverse_of: :collections
  has_many :collection_items, dependent: :destroy
  has_many :items, through: :collection_items
  validates :name, presence: true, length: { in: 3..350 }
end