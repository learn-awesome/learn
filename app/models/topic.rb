# == Schema Information
#
# Table name: topics
#
#  id                :uuid             not null, primary key
#  name              :string           not null
#  search_index      :string           not null
#  gitter_room       :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  display_name      :string
#  user_id           :uuid
#  parent_id         :uuid
#  second_parent_id  :uuid
#  image_url         :string
#  gitter_room_id    :string
#  description       :text
#  wiki_title        :string
#  gpt_quiz_prompt   :text
#  gpt_answer_prompt :text
#

require 'openai'

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
	has_many :slack_subscriptions
	belongs_to :user, optional: true
	belongs_to :parent, class_name: "Topic", optional: true
	belongs_to :second_parent, class_name: "Topic", optional: true, foreign_key: "second_parent_id"
	has_many :children, class_name: "Topic", foreign_key: "parent_id"
	before_validation :set_properties, on: :create
	after_save :clear_cache
	after_destroy :clear_cache
	after_create :update_from_wiki

	def set_properties
		self.display_name = self.display_name.to_s.strip.gsub(/\s+/, ' ')
		if self.display_name.present? and self.name.blank?
			self.name = self.display_name.gsub(" ", "-").downcase
		elsif self.name.present? and self.display_name.blank?
			self.display_name = self.name
		end
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

	def self.discover_with_items
		topic = Topic.order('RANDOM()').first
		return topic if topic.items.count > 2
		return Topic.discover_with_items
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

	def self.fetch_wiki_summary(wiki_title)
		resp = HTTParty.get("https://en.wikipedia.org/api/rest_v1/page/summary/#{wiki_title}")
		if resp.code == 200
			puts resp.body
			data = JSON.parse(resp.body)
			return {} if data["type"] == "disambiguation" # eg: Haskell
			{image_url: data['thumbnail'] && data['thumbnail']['source'], summary: data['extract']}
		else
			{}
		end
	end

	def self.search_wiki(term)
		resp = HTTParty.get("https://en.wikipedia.org/w/api.php?action=opensearch&search=#{term}&limit=1&namespace=0&format=json")
		if resp.code == 200
			puts resp.body
			data = JSON.parse(resp.body)
			data.select { |i| i.is_a? Array and i.any? and i.first.start_with?("https://en.wikipedia.org/wiki/") }.first.try(&:first).try { |s| s.sub("https://en.wikipedia.org/wiki/", "") }
		else
			nil
		end
	end

	def update_from_wiki
		# return unless Rails.env.production?
		wiki_title = self.wiki_title.presence || Topic.search_wiki(self.name)
		if wiki_title
			self.wiki_title = wiki_title
			info = Topic.fetch_wiki_summary(wiki_title)
			self.image_url ||= info[:image_url]
			self.description = self.description.presence || info[:summary]
			Rails.logger.debug "Saving #{self.wiki_title}"
			self.save
		end
	end

	def message_for_twitter_update
		topic = self
		item_type_counts = topic.items.group_by(&:item_type).sort_by { |k,v| v.size * -1 }[0..3]
		if item_type_counts.present?
		  message = "Today's random topic is #{topic.display_name}."
		  message += " We have "
		  message += item_type_counts.map { |p| "#{p.last.size} #{p.first.display_name_plural}" }.join(", ")
		  message += " on this topic. Check it out here: "
		  message += Rails.application.routes.url_helpers.topic_url(topic)
		  return message
		end
		return nil
	end

	def is_gpt_enabled?(user)
		ENV['GPT3_PUBLIC_KEY'].presence && ENV['GPT3_SECRET_KEY'].presence && self.gpt_quiz_prompt.presence
	end

	def gpt_questions(user, max_tokens: 70)
		return nil unless self.is_gpt_enabled?(user)
		client = Openai::Client.new(pk: ENV['GPT3_PUBLIC_KEY'], sk: ENV['GPT3_SECRET_KEY'])
		completions = client.completions(prompt: self.gpt_quiz_prompt, max_tokens: max_tokens)
		completions["choices"].first["text"].split("Question: ").map(&:strip)
	end

	def gpt_check_answers(qna)
		# TODO: qna is an array of [question, answer] pairs. Use GPT-3 to evaluate the answers
		qna.map { |qa| qa + ["✅ You got it right!"]} # ❌
	end

	def display_description
		msg = ""
		if parent and second_parent
			msg += "This is a topic under <a class='text-blue-500 underline' href='/topics/#{parent.id}'>#{parent.display_name}</a> and <a class='text-blue-500 underline' href='/topics/#{second_parent.id}'>#{second_parent.display_name}</a>.\n\n"
		elsif parent
			msg += "This is a topic under <a class='text-blue-500 underline' href='/topics/#{parent.id}'>#{parent.display_name}</a>.\n\n"
		end

		if self.all_children.any?
			msg += "Sub topics: "
			msg += self.all_children.map do |ch| "<a class='text-blue-500 underline' href='/topics/#{ch.id}'>#{ch.display_name}</a>"; end.join(", ")
			msg += "\n\n"
		end
		msg += self.description.to_s
		
		learning_plans = self.advanced_search('learning_plan', nil, nil)
		if learning_plans.any?
			msg += "\n\nWe have #{learning_plans.size} learning paths for this topic: "
			msg += learning_plans.map do |lp| "<a class='text-blue-500 underline' href='/items/#{lp.id}'>#{lp.display_name}</a>"; end.join(", ")
		end
		
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
