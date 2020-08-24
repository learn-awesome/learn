# == Schema Information
#
# Table name: topic_idea_sets
#
#  id          :uuid             not null, primary key
#  topic_id    :uuid             not null
#  idea_set_id :uuid             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  rating      :integer
#

class TopicIdeaSet < ApplicationRecord
	belongs_to :topic, inverse_of: :topic_idea_sets
	belongs_to :idea_set, inverse_of: :topic_idea_sets
	validates :topic, presence: true
	validates :idea_set, presence: true
	validates :topic_id, uniqueness: { scope: :idea_set_id }

	def self.dedupe
		grouped = all.group_by{|ti| [ti.topic_id, ti.idea_set_id] }
		grouped.values.each do |duplicates|
			# the first one we want to keep right?
			first_one = duplicates.shift # or pop for last one
			# if there are any more left, they are duplicates
			# so delete all of them
			duplicates.each{|double| double.destroy} # duplicates can now be destroyed
		end
	end

	def self.check_duplicates
		grouped = all.group_by{|ti| [ti.topic_id, ti.idea_set_id] }
		grouped.keys.select do |ti|
			grouped[ti].size > 1
		end
	end
end
