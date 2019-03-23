class Link < ApplicationRecord
  belongs_to :item
  validates :url, presence: true, length: { in: 8..255 }
  validates :item, presence: true
end
