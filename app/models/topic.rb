# == Schema Information
#
# Table name: topics
#
#  id               :uuid             not null, primary key
#  name             :string           not null
#  search_index     :string           not null
#  gitter_room      :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  display_name     :string
#  user_id          :uuid
#  parent_id        :uuid
#  second_parent_id :uuid
#  image_url        :string
#  gitter_room_id   :string
#  description      :text
#
# Indexes
#
#  index_topics_on_name              (name) UNIQUE
#  index_topics_on_parent_id         (parent_id)
#  index_topics_on_second_parent_id  (second_parent_id)
#  index_topics_on_user_id           (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (parent_id => topics.id)
#  fk_rails_...  (second_parent_id => topics.id)
#  fk_rails_...  (user_id => users.id)
#

class Topic < ApplicationRecord
	SLUG_FORMAT = /\A[0-9a-záéíóúÁÉÍÓÚÑñ\-\/\+]+\z/
	validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 1..50 },
		format: {with: SLUG_FORMAT}
	validates :search_index, presence: true
	validates :display_name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 1..50 }

	has_many :topic_idea_sets, dependent: :destroy, inverse_of: :topic
	has_many :idea_sets, :through => :topic_idea_sets
	has_many :people, :through => :idea_sets
	has_many :items, :through => :idea_sets
	has_many :user_topics, dependent: :destroy, inverse_of: :topic
	has_many :users, through: :user_topics
	belongs_to :user, optional: true
	belongs_to :parent, class_name: "Topic", optional: true
	has_many :children, class_name: "Topic", foreign_key: "parent_id"
	before_validation :set_properties, on: :create
	after_save :clear_cache
	after_destroy :clear_cache

	def set_properties
		self.display_name = self.display_name.to_s.strip.gsub(/\s+/, ' ')
		self.name = self.display_name.gsub(" ", "-").downcase
		self.search_index = self.name
		self.gitter_room = self.name
	end

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

	def self.button_style(theme = :bootstrap)
		return "px-4 mr-2 bg-blue-200 text-gray-900 p-2 rounded leading-none hover:bg-blue-300" if theme == :tailwind
		# px-3 py-1 bg-gray-600 text-gray-100 text-sm font-bold rounded hover:bg-gray-500
		"btn btn-sm btn-soft-primary btn-pill"
	end

	def experts
		@experts ||= self.people.uniq
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
	  ActiveRecord::Base.connection.execute("SELECT set_limit(0.2);")
      if is_fuzzy
        return Topic.where("lower(search_index) LIKE ?", "%#{q.try(:downcase)}%").limit(max)
      else
        return Topic.where(name: q).limit(max)
      end
	end

	def self.merge(original_id, duplicate_id)
		return if original_id == duplicate_id
		
		Topic.transaction do
			TopicIdeaSet.where(topic_id: duplicate_id).update_all(topic_id: original_id)
			TopicRelation.where(from_id: duplicate_id).update_all(from_id: original_id)
			TopicRelation.where(to_id: duplicate_id).update_all(to_id: original_id)
			UserTopic.where(topic_id: duplicate_id).update_all(topic_id: original_id)
			Topic.find(duplicate_id).destroy
		end
	end

	def self.get_all
		Rails.cache.fetch("all_topics", expires_in: 1.hours) do
			Topic.all.to_a.sort_by(&:display_name)
		end
	end

	def clear_cache
		Rails.cache.delete('all_topics')
	end

	def ancestors
		(parent.try(:ancestors).to_a + [parent]).compact
	end

	def all_children
		@all_children ||= (self.children.to_a + Topic.where(second_parent_id: self.id).to_a).uniq
	end

	def image_url(tailwind=false)
		return self.read_attribute(:image_url) if self.read_attribute(:image_url).present?
		response = HTTParty.get("https://source.unsplash.com/400x300/?" + self.name.to_s.gsub("/",",").gsub("-",","), follow_redirects: false)
		if response.code >= 300 && response.code < 400
			redirect_url = response.headers['location']
			self.write_attribute(:image_url, redirect_url)
			self.save if self.persisted?
			return redirect_url
		else
			return "https://source.unsplash.com/400x300/?"
		end
	end

	def display_name_without_ancestors
		self.display_name.to_s.split("/").last.strip
	end

	def display_description
		# TODO: Show a blurb from wikipedia, then talk about prerequisites and subtopics, and learning plans/paths
		msg = ""
		if parent and second_parent
			msg += "This falls under <a href='/topics/#{parent.id}'>#{parent.display_name}</a> and <a href='/topics/#{second_parent.id}'>#{second_parent.display_name}</a>"
		elsif parent
			msg += "This falls under <a href='/topics/#{parent.id}'>#{parent.display_name}</a>."
		end
		msg += self.description.to_s
		msg.html_safe
	end

	def search_keyword
		self.display_name.to_s.gsub("-"," ")
	end

	def self.get_hierarchy(root_topic)
		all_topics = Topic.get_all
		by_parent_id = all_topics.group_by(&:parent_id) # includes nil as a key with value as array of all top-level topics
		all_topics.select { |t| t.second_parent_id.present? }.each do |tt|
			by_parent_id[tt.second_parent_id] ||= []
			by_parent_id[tt.second_parent_id].push(tt)
		end
		children = by_parent_id[root_topic.try(&:id)]
		misc = Topic.new(display_name: 'Other Topics')
		result = {}
		misc_child = []
		children.to_a.each do |child|
			if by_parent_id[child.id].present? # it has children
				result[child] = by_parent_id[child.id]
			else
				misc_child << child
			end
		end
		result[misc] = misc_child unless misc_child.blank?
		return result.sort_by {|k,v| k.name.try(:downcase).to_s }.to_h
	end
end
