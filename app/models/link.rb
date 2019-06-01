require 'uri/http'

class Link < ApplicationRecord
  belongs_to :item
  validates :url, presence: true, length: { in: 8..255 }
  validates :item, presence: true

  def top_domain
  	PublicSuffix.parse(URI.parse(self.url).host).domain
  end
end
