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
#  description         :text
#  metadata            :json             not null
#
require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'

class Item < ApplicationRecord
  belongs_to :idea_set, inverse_of: :items
  has_many :topics, through: :idea_set
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
  after_save :clear_cache
  after_destroy :clear_cache
  
  accepts_nested_attributes_for :links, allow_destroy: true, reject_if: :all_blank

  attr_accessor :other_item_id

  scope :curated, -> { where("1 = 1") }
  scope :recent, -> { order("created_at DESC").limit(3) }
  scope :popular, -> { order("(inspirational_score + educational_score + challenging_score + entertaining_score + visual_score + interactive_score) DESC").limit(3) }

  def to_param
    self.id.to_s + "-" + self.name.to_s.parameterize
  end

  def self.from_param(id)
    self.where(id: id.to_s.split("-")[0..4].join("-")).first
  end

  def creators
    self.idea_set.person_idea_sets.where(role: 'creator').collect(&:person).collect(&:name).join(", ")
  end

  def as_json(options = {})
    {id: self.id, name: self.name.titleize, item_type_id: self.item_type_id.titleize, creators: self.creators}
  end

  def thumbnail
    if self.links.any? { |l| l.url.include?("youtube.com") }
      videoid = Item.youtube_id(self.links.select { |l| l.url.include?("youtube.com") }.first.url)
      return "https://img.youtube.com/vi/#{videoid}/0.jpg"
    else
      return "/icons/#{self.item_type_id}.svg"
    end
  end

  def self.searchable_language
    'english'
  end

  def self.search(q, max=10, is_fuzzy=true)
  	if q.start_with?('http://') or q.start_with?('https://')
      #TODO: Fetch the canonical URL and use that instead
  		return Link.where(url: q).limit(max).map(&:item)
  	else
      if is_fuzzy
        return Item.where("lower(name) LIKE ?", "%#{q.try(:downcase)}%").limit(max)
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

  def self.discover(topics = nil, item_type_ids = nil)
    items = Item
    items = items.where(item_type_id: item_type_ids) unless item_type_ids.blank?
    items = items.includes(:topics).where('topic_idea_sets.topic_id' => topics.map(&:id)) unless topics.blank?
    found = items.order('RANDOM()').first
    if found.nil?
      return Item.where(item_type_id: item_type_ids).order('RANDOM()').first
    else
      return found
    end
  end

  def self.extract_canonical_url(url)
    # url = 'https://www.goodreads.com/book/show/23692271-sapiens?ac=1&from_search=true'
    page = Nokogiri::HTML(open(url))

    return page.at('link[rel="canonical"]')&.attributes["href"]&.value
  end

  def self.extract_opengraph_data(url)
    Rails.cache.fetch("grdata_#{url}", expires_in: 12.hours) do
      if url.include?("goodreads.com")
        # url = 'https://www.goodreads.com/book/show/23692271-sapiens?ac=1&from_search=true'
        item_type = 'book'
        page = Nokogiri::HTML(open(url))

        canonical = page.at('link[rel="canonical"]')&.attributes["href"]&.value
        isbn = page.at('meta[property="books:isbn"]')&.attributes["content"]&.value
        #image_url = page.at('meta[property="og:image"]')&.attributes["content"]&.value
        image_url = "http://covers.openlibrary.org/b/isbn/#{isbn}.jpg" if isbn.present?
        title = page.at('meta[property="og:title"]')&.attributes["content"]&.value
        authors = page.search('meta[property="books:author"]').map { |x| x.attributes["content"] }.map(&:value)
        page_count = page.at('meta[property="books:page_count"]')&.attributes["content"]&.value.to_i
        # description = page.at('meta[property="og:description"]')&.attributes["content"]&.value
        description = (page.css("div#description") > "span:last").inner_text
        topics = page.css("a.bookPageGenreLink").map {|n| n.attributes["href"]&.value }.select { |s| s.start_with?("/genres/") }.map { |s|
          Topic.find_by_name(s.gsub("/genres/",""))
        }.compact
        creator_bio = (page.css("div.bookAuthorProfile__about") > "span:last").inner_text

        {
          item_type: item_type,
          canonical: canonical,
          image_url: image_url,
          title: title,
          description: description,
          topics: topics,
          creators: authors,
          creator_bio: creator_bio,
          metadata: {isbn: isbn, page_count: page_count}
        }
      elsif url.include?("youtube.com") or url.include?("vimeo.com")
        page = Nokogiri::HTML(open(url))
        canonical = page.at('link[rel="canonical"]')&.attributes["href"]&.value
        image_url = page.at('meta[property="og:image"]')&.attributes["content"]&.value
        title = page.at('meta[property="og:title"]')&.attributes["content"]&.value
        description = page.at('meta[property="og:description"]')&.attributes["content"]&.value
        {
          item_type: 'video',
          topics: [],
          canonical: canonical,
          image_url: image_url,
          title: title,
          description: description
        }
      elsif url.include?("wikipedia.org")
        page = Nokogiri::HTML(open(url))
        title = page.at('title')&.content
        canonical = page.at('link[rel="canonical"]')&.attributes["href"]&.value
        {
          item_type: 'wiki',
          topics: [],
          canonical: canonical,
          title: title
        }
      else
        page = Nokogiri::HTML(open(url))
        title = page.at('title')&.content
        canonical = page.at('link[rel="canonical"]')&.attributes && page.at('link[rel="canonical"]')&.attributes["href"]&.value
        {
          topics: [],
          canonical: canonical,
          title: title.to_s.strip
        }
      end
    end
  end

  def display_name
    self.name
  end

  def display_description
    # TODO: Why not allow markdown for all item descriptions instead of only syllabuses?
    # Could lead to styling abuse by using headings, links, lists etc
    if self.item_type_id == 'learning_plan' and self.links.size == 0
      # this is a native learning plan
      markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML.new(
        filter_html: true,
        no_images: true,
        no_links: true,
        no_styles: true
      ))
      html = markdown.render(self.description.to_s.strip).html_safe
      return self.replace_la_links_with_embeds(html)
    else
      return self.description.to_s.strip
    end
  end

  def replace_la_links_with_embeds(html)
    # detect all URLs to items in given html string and replace them with their content_html
    pattern = /(https?:\/\/[a-z.]+(:3000)?\/items\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(-\S+)?)/
    html.scan(pattern).each do |match|
      # match = [url, port, itemid, idsuffix]
      html.sub!(match.first, Item.find(match[2]).content_html(match.first))
    end
    html.html_safe
  end

  def content_html(url)
    "<a href=\"" + url + "\" target='_blank'>" + self.display_name + "</a>"
    # When items are included in syllabuses, we may want to avoid a few clicks
    # by directly fetching the content of the first/primary link
    # If the item has one link to youtube or soundcloud or image etc, they can directly be shown
    # For some other cases, an <iframe> tag might suffice but that won't always be allowed.
    # This will need a bunch of heuristics and can be improved gradually.
  end

  def combine(other_item)
    return nil if other_item.idea_set_id == self.idea_set_id
    prev_idea_set = other_item.idea_set
    prev_idea_set.items.update(idea_set_id: self.idea_set_id)
    IdeaSet.find(prev_idea_set.id).destroy # destroy after reload
    return nil # success. Return msg in case of failure
  end

  def related_items
    self.idea_set.items.reject { |i| i.id == self.id }
  end

  def clear_cache
    self.topics.each do |t|
      Rails.cache.delete("topic_items_#{t.id}")
    end
  end

  def self.suggest_format(url)
    return "video" if ["youtube.com", "vimeo.com"].any? { |dom| url.include?(dom) }
    return "wiki" if ["wikipedia.org"].any? { |dom| url.include?(dom) }
    return "book" if ["goodreads.com"].any? { |dom| url.include?(dom) }
    return "course" if ["classcentral.com", "coursera.org", "edx.org"].any? { |dom| url.include?(dom) }
    return "article"
  end

  def url
    self.links.first.try(:url)
  end

  def url=(val)
    self.links.build unless self.links.present?
    self.links.first.url = val
  end

  def embed_url
    if self.links.any? { |l| l.url.include?("youtube.com") or l.url.include?("vimeo.com") }
      Item.video_embed(self.links.select { |l| l.url.include?("youtube.com") }.first.url)
    else
      self.links.first.url
    end
  end

  def self.youtube_id(youtube_url)
    regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    match = regex.match(youtube_url)
    if match && !match[1].blank?
      match[1]
    else
      nil
    end
  end

  def self.video_embed(video_url)

    # REGEX PARA EXTRAER EL ID DEL VIDEO
    regex_id = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/|vimeo\.com\/)([a-zA-Z0-9_-]{8,11})/
    match_id = regex_id.match(video_url)
    video_id = ""
    if match_id && !match_id[1].blank?
      video_id = match_id[1]
    end

    # REGEX PARA EXTRAER EL PROVEEDOR - YOUTUBE/VIMEO
    regex_prov = /(youtube|youtu\.be|vimeo)/
    match_prov = regex_prov.match(video_url)
    video_prov = ""
    if match_prov && !match_prov[1].blank?
      video_prov = case match_prov[1]
                     when "youtube"
                       :youtube
                     when "youtu.be"
                       :youtube
                     when "vimeo"
                       :vimeo
      end
    end

    case video_prov
      when :youtube
        "https://www.youtube.com/embed/#{video_id}"
      when :vimeo
        "https://player.vimeo.com/video/#{video_id}"
    end
  end
end
