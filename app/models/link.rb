# == Schema Information
#
# Table name: links
#
#  id         :uuid             not null, primary key
#  url        :string           not null
#  item_id    :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#  is_primary :boolean
#

require 'uri/http'

class Link < ApplicationRecord
  belongs_to :item, inverse_of: :links
  validates :url, presence: true, length: { in: 8..350 }
  validates :url, format: URI::regexp(%w[http https]) #TODO Allow other protocols like IPFS / magnet 
  validates :item, presence: true
  validates :url, uniqueness: true
  validate :valid_url?

  BLACKLISTED_DOMAINS = [
    ''
  ]

  EMBED_ALLOWED_DOMAINS = [
  ]

  def valid_url?
    uri = URI.parse(url)
    uri.is_a?(URI::HTTP) && !uri.host.nil? && !BLACKLISTED_DOMAINS.include?(uri.host)
  rescue URI::InvalidURIError
    errors.add(:url, "is invalid")
  end

  def top_domain
  	URI.parse(self.url).host.downcase.gsub("www.","")
  end

  def is_broken?
  	false
  end
end
