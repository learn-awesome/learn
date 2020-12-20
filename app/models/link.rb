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
require 'final_redirect_url'

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
    'web.archive.org'
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

  def self.lookup_entity_by_url(url)
    return unless url.present?
    url = FinalRedirectUrl.final_redirect_url(url) # Follow redirects up to level 10 # TODO: excute JS-based redirects

    if Rails.env.production?
      domain = "https://learnawesome.org"
    else
      domain = "http://localhost"
    end

    if url.include?("#{domain}/items/")
      return Item.from_param(url.sub("#{domain}/items/",""))
    elsif url.include?("#{domain}/topics/")
      return Topic.from_param(url.sub("#{domain}/topics/",""))
    # elsif url.include?("#{domain}/reviews/")
    #   return Review.where(id: url.sub("#{domain}/reviews","")).first
    elsif url.include?(domain)
      return nil # LearnAwesome URLs should not be treated like external URLs
    else
      extracted = Item.extract_opengraph_data(url) rescue {}
      url = extracted[:canonical] || url
      item = Link.where(url: url).first.try(:item)
      return item || url
    end
  rescue Exception => e
    Rails.logger.info "Exception in Link.lookup_entity_by_url for #{url}: #{e.message}"
    return nil
  end
end
