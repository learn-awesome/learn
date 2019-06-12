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
#

class Person < ApplicationRecord
	has_many :person_idea_sets
	has_many :idea_sets, :through => :person_idea_sets
end
