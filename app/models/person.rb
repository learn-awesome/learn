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
end
