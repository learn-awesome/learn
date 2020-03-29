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
	validates :website, presence: true, allow_nil: true, length: {minimum: 8, maximum: 255}
	validates :email, presence: true, allow_nil: true, length: {minimum: 4, maximum: 30}
	validates :twitter, presence: true, allow_nil: true, length: {minimum: 2, maximum: 25}
	validates :goodreads, presence: true, allow_nil: true, length: {minimum: 8, maximum: 255}
	validates :description, presence: true, allow_nil: true, length: {minimum: 8, maximum: 4096}


	def self.search(q, max=10, is_fuzzy=true)
    	if is_fuzzy
			Person.where("lower(name) ILIKE ?", "%#{q}%").limit(max)
		else
			Person.where(name: q).limit(max)
		end
	end

	def avatar_image
		#TODO: Should be kept as a column
		"/stream/assets/img/logo-mobile.png"
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
end
