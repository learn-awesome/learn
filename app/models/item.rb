# == Schema Information
#
# Table name: items
#
#  id                  :uuid             not null, primary key
#  name                :string           not null
#  item_type_id        :string           not null
#  estimated_time      :integer
#  time_unit           :string           default("minutes"), not null
#  required_expertise  :integer
#  idea_set_id         :uuid             not null
#  user_id             :uuid             not null
#  year                :integer
#  image_url           :string
#  inspirational_score :integer
#  educational_score   :integer
#  challenging_score   :integer
#  entertaining_score  :integer
#  visual_score        :integer
#  interactive_score   :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  typical_age_range   :string
#
require 'uri'

class Item < ApplicationRecord
  belongs_to :idea_set, inverse_of: :items
  belongs_to :item_type
  has_many :links, dependent: :destroy, inverse_of: :item
  has_many :reviews, dependent: :destroy, inverse_of: :item
  belongs_to :user # submitter
  validates :name, presence: true, length: { in: 3..150 } # removed uniqeness validation
  validates :item_type, presence: true
  validates :idea_set, presence: true
  validates :user, presence: true
  validates :image_url, allow_blank: true, format: URI::regexp(%w[http https])
  validates :typical_age_range, allow_blank: true, format: /\A(\d{1,2})?-(\d{1,2})?\Z/
  
  accepts_nested_attributes_for :links, allow_destroy: true

  scope :curated, -> { where("1 = 1") }
  scope :recent, -> { order("created_at DESC").limit(3) }
  scope :popular, -> { order("(inspirational_score + educational_score + challenging_score + entertaining_score + visual_score + interactive_score) DESC").limit(3) }

  def to_param
    self.id.to_s + "-" + self.name.to_s.parameterize
  end

  def self.from_param(id)
    self.find(id.to_s.split("-")[0..4].join("-"))
  end

  def creators
    self.idea_set.person_idea_sets.where(role: 'creator').collect(&:person).collect(&:name).join(", ")
  end

  def as_json(options = {})
    {id: self.id, name: self.name.titleize, item_type_id: self.item_type_id.titleize, creators: self.creators}
  end

  def self.searchable_language
    'english'
  end

  def self.search(q, max, is_fuzzy=true)
  	if q.start_with?('http://') or q.start_with?('https://')
      #TODO: Fetch the canonical URL and use that instead
  		return Link.where(url: q).limit(max).map(&:item)
  	else
      if is_fuzzy
        return Item.fuzzy_search(name: q).limit(max)
      else
        return Item.where(name: q).limit(max)
      end
  	end
  end

  def self.advanced_search(topic_name, item_type, length, quality)
    results = Item.all

    if topic_name.present?
      topic = Topic.where(name: topic_name).first
      results = results.where(id: topic.items.map(&:id)) if topic
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
    return results.limit(20)
  end

  def self.discover
    Item.order('RANDOM()').first
  end

  def topics
    self.idea_set.topics
  end

  def self.extract_canonical_url(url)
    require 'nokogiri'
    require 'open-uri'

    # url = 'https://www.goodreads.com/book/show/23692271-sapiens?ac=1&from_search=true'
    page = Nokogiri::HTML(open(url))

    return page.at('link[rel="canonical"]')&.attributes["href"]&.value
  end

  def display_name
    self.name
  end
end
