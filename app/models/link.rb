# == Schema Information
#
# Table name: links
#
#  id         :uuid             not null, primary key
#  url        :string           not null
#  item_id    :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_links_on_item_id  (item_id)
#
# Foreign Keys
#
#  fk_rails_...  (item_id => items.id)
#

require 'uri/http'

class Link < ApplicationRecord
  belongs_to :item, inverse_of: :links
  validates :url, presence: true, length: { in: 8..350 }
  validates :url, format: URI::regexp(%w[http https]) #TODO Allow other protocols like IPFS / magnet 
  validates :item, presence: true
  validates :url, uniqueness: true

  def top_domain
  	URI.parse(self.url).host.downcase.gsub("www.","")
  end

  def is_broken?
  	false
  end
end
