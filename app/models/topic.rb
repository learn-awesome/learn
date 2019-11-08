# == Schema Information
#
# Table name: topics
#
#  id           :uuid             not null, primary key
#  name         :string           not null
#  search_index :string           not null
#  gitter_room  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :uuid
#

class Topic < ApplicationRecord
	SLUG_FORMAT = /\A[0-9a-z\-\/]+\z/
	ActiveRecord::Base.connection.execute("SELECT set_limit(0.2);")
	validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 1..50 },
		format: {with: SLUG_FORMAT}
	validates :search_index, presence: true

	has_many :topic_idea_sets, dependent: :destroy, inverse_of: :topic
	has_many :idea_sets, :through => :topic_idea_sets
	has_many :items, :through => :idea_sets
	has_many :user_topics, dependent: :destroy, inverse_of: :topic
	has_many :users, through: :user_topics
	after_save :clear_cache
	after_destroy :clear_cache

	def to_param
		self.id.to_s + "-" + self.name.to_s.parameterize
	end

	def self.from_param(id)
		self.where(id: id.to_s.split("-")[0..4].join("-")).first
	end

	def as_json(options = {})
		{
			id: self.id,
			name: self.name,
			search_index: self.search_index,
			to_param: self.to_param
		}
	end

	def self.button_style
		"btn-success"
	end

	def chat_room
		#self.gitter_room or self.name.downcase
		'community'
	end

	def advanced_search(item_type, length, quality)
		results = Rails.cache.fetch("topic_items_#{self.id}", expires_in: 24.hours) do
			self.items
		end
	    if item_type.present?
	      results = results.where(item_type_id: item_type)
	    end
	    
	    if length.present?
	      range_start = length.split("-").first.to_i
	      range_finish = length.split("-").last.to_i
	      results = results.where(["case when time_unit = 'minutes' then estimated_time when time_unit = 'hours' then estimated_time * 60 end between :start and :finish", {start: range_start, finish: range_finish}])
	    end

	    if ['inspirational', 'educational', 'challenging', 'entertaining', 'visual', 'interactive'].include?(quality)
	      results = results.where("#{quality}_score >= 4.0")
	    end
	    return results
	end

	def display_name
		self.read_attribute(:display_name) || self.name.gsub("-", " ")
	end

	def curators
		self.user_topics.where(action: "curate").collect(&:user)
	end

	def followers
		self.user_topics.where(action: "follow").collect(&:user)
	end

	def self.discover
		Topic.order('RANDOM()').first
	end

	def self.searchable_language
		'english'
	end

	def self.search(q, max=10, is_fuzzy=true)
      if is_fuzzy
        return Topic.where("lower(search_index) LIKE ?", "%#{q.try(:downcase)}%").limit(max)
      else
        return Topic.where(name: q).limit(max)
      end
	end

	def self.merge(original, duplicate)
		Topic.transaction do
			TopicIdeaSet.where(topic_id: duplicate.id).update_all(topic_id: original.id)
			TopicRelation.where(from_id: duplicate.id).update_all(from_id: original)
			TopicRelation.where(to_id: duplicate.id).update_all(to_id: original)
			duplicate.destroy
		end
	end

	def self.get_all
		Rails.cache.fetch("all_topics", expires_in: 24.hours) do
			Topic.all.to_a.sort_by(&:display_name)
		end
	end

	def clear_cache
		Rails.cache.delete('all_topics')
	end
end
