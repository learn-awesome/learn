class Item < ApplicationRecord
  belongs_to :idea_set
  belongs_to :item_type
  has_many :links
  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 8..120 }
  validates :item_type, presence: true
  validates :idea_set, presence: true
  accepts_nested_attributes_for :links, allow_destroy: true

  def self.search(q, max=1)
  	if q.start_with?('http')
      #TODO: Fetch the canonical URL and use that instead
  		Link.where(url: q).limit(max).map(&:item)
  	else
      # TODO: Fuzzy search using the items.search_index column
  		Item.where(name: q).limit(max)
  	end
  end
end
