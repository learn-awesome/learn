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

	def self.search(q, max=10, is_fuzzy=true)
    if is_fuzzy
			Person.where("lower(name) ILIKE ?", "%#{q}%").limit(max)
		else
			Person.where(name: q).limit(max)
		end
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

	def as_json
		{
			id: self.id,
			name: self.name,
			to_param: self.to_param
		}
	end
end
