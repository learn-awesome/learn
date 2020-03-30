# == Schema Information
#
# Table name: people
#
#  id          :uuid             not null, primary key
#  name        :string           not null
#  description :text
#  website     :string
#  email       :string
#  twitter     :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  metadata    :json             not null
#  goodreads   :string
#

class Person < ApplicationRecord
	has_many :person_idea_sets
	has_many :idea_sets, :through => :person_idea_sets
	has_many :items, :through => :idea_sets

	validates :name, presence: true, length: {minimum: 4, maximum: 255}
	# validates :website, presence: true, allow_nil: true, length: {minimum: 8, maximum: 255}
	# validates :email, presence: true, allow_nil: true, length: {minimum: 4, maximum: 30}
	# validates :twitter, presence: true, allow_nil: true, length: {minimum: 2, maximum: 25}
	# validates :goodreads, presence: true, allow_nil: true, length: {minimum: 8, maximum: 255}
	# validates :description, presence: true, allow_nil: true, length: {minimum: 8, maximum: 4096}


	def self.search(q, max=10, is_fuzzy=true)
    	if is_fuzzy
			Person.where("lower(name) ILIKE ?", "%#{q}%").limit(max)
		else
			Person.where(name: q).limit(max)
		end
	end

	def avatar_image
		#TODO: Should be kept as a column
		self.image_url || "/stream/assets/img/logo-mobile.png"
	end

	def display_name
		self.name
	end

	def to_param
		self.id.to_s + "-" + self.name.to_s.parameterize
	end

	def self.from_param(id)
		# extract uuid
		self.where(id: id.to_s.split("-")[0..4].join("-")).first
	end

	def as_json(options = {})
		{
			id: self.id,
			name: self.name,
			to_param: self.to_param
		}
	end

	def goodreads_url
		return nil if self.goodreads.blank?
		return self.goodreads if self.goodreads.include?("goodreads.com")
		return "https://www.goodreads.com/author/show/#{self.goodreads}"
	end

	def twitter_url
		return nil if self.twitter.blank?
		return self.twitter if self.twitter.include?("twitter.com")
		return "https://twitter.com/#{self.twitter}"
	end

	def self.wikidata_search(name)
		# First get entity ID
		# https://www.wikidata.org/w/api.php?action=wbsearchentities&language=en&limit=20&format=json&search=steven%20pinker
		r = HTTParty.get("https://www.wikidata.org/w/api.php?action=wbsearchentities&language=en&limit=10&format=json&search=" + name.gsub(" ","%20"))
		entity = JSON.parse(r.body)['search'].try(&:first)
		return {} if entity.nil?
		uri = entity['concepturi'] # http://www.wikidata.org/entity/Q212730
		data = JSON.parse(HTTParty.get(uri + ".json").body)
		# https://commons.wikimedia.org/wiki/Special:FilePath/Ad-tech_London_2010_(2).JPG?width=200 v/s https://commons.wikimedia.org/wiki/File:
		return {
			name: data.dig('entities', entity['id'], 'labels', 'en', 'value'),
			description: data.dig('entities', entity['id'], 'descriptions', 'en', 'value'),
			image_url: data.dig('entities', entity['id'], 'claims', 'P18').try { first.dig('mainsnak','datavalue', 'value').try { gsub(" ","_") } }.try { |s| "https://commons.wikimedia.org/wiki/Special:FilePath/" + s + "?width=200"},
			website: data.dig('entities', entity['id'], 'claims', 'P856').try { first.dig('mainsnak','datavalue', 'value') },
			goodreads: data.dig('entities', entity['id'], 'claims', 'P2963').try { first.dig('mainsnak','datavalue', 'value') },
			twitter: data.dig('entities', entity['id'], 'claims', 'P2002').try { first.dig('mainsnak','datavalue', 'value') },
		}
	end
end
