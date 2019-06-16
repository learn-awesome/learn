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

require 'uri/http'

class Link < ApplicationRecord
  belongs_to :item
  validates :url, presence: true, length: { in: 8..350 }
  validates :url, format: URI::regexp(%w[http https])
  validates :item, presence: true

  def top_domain
  	PublicSuffix.parse(URI.parse(self.url).host).domain
  end
end
