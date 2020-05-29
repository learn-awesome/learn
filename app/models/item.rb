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
# Indexes
#
#  index_items_on_idea_set_id   (idea_set_id)
#  index_items_on_item_type_id  (item_type_id)
#  index_items_on_user_id       (user_id)
#  trgm_items_name_indx         (name) USING gist
#
# Foreign Keys
#
#  fk_rails_...  (idea_set_id => idea_sets.id)
#  fk_rails_...  (item_type_id => item_types.id)
#  fk_rails_...  (user_id => users.id)
#
require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'

class Item < ApplicationRecord
  belongs_to :idea_set, inverse_of: :items
  has_many :topic_idea_sets, through: :idea_set
  has_many :topics, through: :idea_set
  belongs_to :item_type
  has_many :links, dependent: :destroy, inverse_of: :item
  has_many :reviews, dependent: :destroy, inverse_of: :item
  belongs_to :user # submitter
  validates :name, presence: true, length: { in: 3..250 } # removed uniqeness validation
  validates :item_type, presence: true
  validates :idea_set, presence: true
  validates :user, presence: true
  validates :image_url, allow_blank: true, format: URI::regexp(%w[http https])
  validates :typical_age_range, allow_blank: true, format: /\A(\d{1,2})?-(\d{1,2})?\Z/
  validates :links, presence: true, if: -> { item_type_id != 'learning_plan' and !allow_without_links}
  after_save :clear_cache
  after_create :notify_gitter, :update_points
  after_destroy :clear_cache
  
  accepts_nested_attributes_for :links, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :idea_set

  attr_accessor :other_item_id
  attr_accessor :allow_without_links

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

  def authors
    self.idea_set.person_idea_sets.where(role: 'creator').collect(&:person)
  end

  def as_json(options = {})
    {
      id: self.id,
      name: self.name.titleize,
      item_type_id: self.item_type_id.titleize,
      creators: self.creators,
      to_param: self.to_param
    }
  end

  def thumbnail
    if self.links.any? { |l| l.url.include?("youtube.com") }
      videoid = Item.youtube_id(self.links.select { |l| l.url.include?("youtube.com") }.first.url)
      return "https://img.youtube.com/vi/#{videoid}/0.jpg"
    else
      return "/icons/#{self.item_type_id}.svg"
    end
  end

  def new_thumbnail
    if self.links.any? { |l| l.url.include?("youtube.com") }
      videoid = Item.youtube_id(self.links.select { |l| l.url.include?("youtube.com") }.first.url)
      return "https://img.youtube.com/vi/#{videoid}/0.jpg"
    elsif self.image_url.present?
      return self.image_url
    else
      "https://source.unsplash.com/640x400/?" + self.topics.first.name.to_s.gsub("/",",").gsub("-",",")
    end
  end

  def average_overall_score
    return 0 unless reviews.present?
    scores = reviews.pluck(:overall_score).compact
    return 0 if scores.blank?
    return scores.sum / scores.size
  end

  def large_thumbnail
    return self.image_url if self.image_url.present?
    if self.links.any? { |l| l.url.include?("youtube.com") }
      videoid = Item.youtube_id(self.links.select { |l| l.url.include?("youtube.com") }.first.url)
      return "https://img.youtube.com/vi/#{videoid}/0.jpg"
    end
  end

  def self.searchable_language
    'english'
  end

  def is_syllabus?
    self.item_type_id == 'learning_plan' and self.links.blank?
  end

  def can_user_edit?(editor)
    return true if Rails.env.development?
    return false if editor.nil? or !editor.is_a?(User)
    return false if editor.score < 500
    return false if self.is_syllabus? and self.user_id != editor.id
    return true
  end

  def can_user_change_related_items?(editor)
    return true if Rails.env.development?
    return false if editor.nil? or !editor.is_a?(User)
    return false if editor.score < 500
    return false if self.is_syllabus?
    return true
  end

  def can_user_destroy?(user)
    return true if user and user.is_core_dev?
    return false
  end

  def self.search(q, max=10, is_fuzzy=true)
  	if q.start_with?('http://') or q.start_with?('https://')
      # canonical URL is now handled in items_controller#search
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
    begin
      page = Nokogiri::HTML(open(url))

      return page.at('link[rel="canonical"]')&.attributes["href"]&.value
    rescue Exception => ex
      return nil
    end
  end

  def update_opengraph_data
    extracted = Item.extract_opengraph_data(self.primary_link.url)
    if extracted.present?
      self.image_url = extracted[:image_url] # TODO: don't overwrite existing values
      self.description = extracted[:description] # TODO: same
      self.save
    end
  end

  def self.create_book(book, creator)
    Item.transaction do
      idea_set = IdeaSet.new(name: book.title, description: book.description)
      if book.author_link.present? or book.author_name.present?
        author = Person.where(website: book.author_link).or(Person.where(goodreads: book.author_link)).or(Person.where(name: book.author_name)).first
        if author.nil?
          author = Person.create!(name: book.author_name, website: book.author_link)
        else
          author.update_attributes!(name: book.author_name, website: book.author_link)
        end
        idea_set.person_idea_sets.build(role: 'creator', person_id: author.id)
      end
      idea_set.save!

      book.topics.each do |t|
        idea_set.topic_idea_sets.create!(topic_id: Topic.find_by_name(t).id)
      end

      item = Item.new(name: book.title, item_type_id: 'book', image_url: book.cover_image, user: creator)
      item.idea_set = idea_set

      if book.openlibrary_link.present?
        item.links.build(url: book.openlibrary_link)
      end

      if book.goodreads_link.present?
        item.links.build(url: book.goodreads_link)
      end

      if book.google_books_link.present?
        item.links.build(url: book.google_books_link)
      end

      if book.amazon_link.present?
        item.links.build(url: book.amazon_link)
      end

      if book.direct_link.present?
        item.links.build(url: book.direct_link)
      end

      if item.links.any?
        item.save
        Rails.logger.info("Item created #{item.id}")
      end

      # Now save all related items
      if book.four_minute_books_link.present?
        if (exlink = Link.where(url: book.four_minute_books_link).first).present?
          # Merge the idea_sets
          exlink.item.idea_set = idea_set
          exlink.item.save!
        else
          relitem = Item.new(
            idea_set: idea_set,
            name: book.title + " - Summary by FourMinuteBooks",
            image_url: book.cover_image,
            description: book.description,
            user: creator,
            item_type_id: 'summary')
          relitem.links.build(url: book.four_minute_books_link)
          relitem.save!
        end
      end

      if book.derek_sivers_link.present?
        if (exlink = Link.where(url: book.derek_sivers_link).first).present?
          # Merge the idea_sets
          exlink.item.idea_set = idea_set
          exlink.item.save!
        else
          relitem = Item.new(
            idea_set: idea_set,
            name: book.title + " - Summary by Derek Sivers",
            image_url: book.cover_image,
            description: book.description,
            user: creator,
            item_type_id: 'summary')
          relitem.links.build(url: book.derek_sivers_link)
          relitem.save!
        end
      end

      if book.blas_link.present?
        if (exlink = Link.where(url: book.blas_link).first).present?
          # Merge the idea_sets
          exlink.item.idea_set = idea_set
          exlink.item.save!
        else
          relitem = Item.new(
            idea_set: idea_set,
            name: book.title + " - Summary at Blas.com",
            image_url: book.cover_image,
            description: book.description,
            user: creator,
            item_type_id: 'summary')
          relitem.links.build(url: book.blas_link)
          relitem.save!
        end
      end

    end
  end

  def update_book(book, creator)
    Item.transaction do

      if book.author_link.present? or book.author_name.present?
        author = Person.where(website: book.author_link).or(Person.where(goodreads: book.author_link)).or(Person.where(name: book.author_name)).first
        if author.nil?
          author = Person.create!(name: book.author_name, website: book.author_link)
        else
          author.update_attributes!(name: book.author_name, website: book.author_link)
        end
        idea_set.person_idea_sets.create!(role: 'creator', person_id: author.id)
      end

      if book.goodreads_link.present? && links.where(url: book.goodreads_link).first.nil?
        links.create!(url: book.goodreads_link)
      end

      if book.openlibrary_link.present? && links.where(url: book.openlibrary_link).first.nil?
        links.create!(url: book.openlibrary_link)
      end

      if book.google_books_link.present? && links.where(url: book.google_books_link).first.nil?
        links.create!(url: book.google_books_link)
      end

      if book.amazon_link.present? && links.where(url: book.amazon_link).first.nil?
        links.create!(url: book.amazon_link)
      end

      if book.direct_link.present? && links.where(url: book.direct_link).first.nil?
        links.create!(url: book.direct_link)
      end

      if book.four_minute_books_link.present?
        if related_items.select { |i| i.links.where(url: book.four_minute_books_link).first.present? }.present?
          # pass
        elsif (exlink = Link.where(url: book.four_minute_books_link).first).present?
          # Merge the idea_sets
          exlink.item.idea_set = idea_set
          exlink.item.save!
        else
          relitem = Item.new(
            idea_set: idea_set,
            name: name + " - Summary by FourMinuteBooks",
            user: creator,
            item_type_id: 'summary')
          relitem.links.build(url: book.four_minute_books_link)
          relitem.save!
        end
      end

      if book.derek_sivers_link.present?
        if related_items.select { |i| i.links.where(url: book.derek_sivers_link).first.present? }.present?
          # pass
        elsif (exlink = Link.where(url: book.derek_sivers_link).first).present?
          # Merge the idea_sets
          exlink.item.idea_set = idea_set
          exlink.item.save!
        else
          relitem = Item.new(
            idea_set: idea_set,
            name: name + " - Summary by Derek Sivers",
            user: creator,
            item_type_id: 'summary')
          relitem.links.build(url: book.derek_sivers_link)
          relitem.save!
        end
      end

      if book.blas_link.present?
        if related_items.select { |i| i.links.where(url: book.blas_link).first.present? }.present?
          # pass
        elsif (exlink = Link.where(url: book.blas_link).first).present?
          # Merge the idea_sets
          exlink.item.idea_set = idea_set
          exlink.item.save!
        else
          relitem = Item.new(
            idea_set: idea_set,
            name: name + " - Summary at Blas.com",
            user: creator,
            item_type_id: 'summary')
          relitem.links.build(url: book.blas_link)
          relitem.save!
        end
      end

      self.image_url ||= book.cover_image
      self.description ||= book.description
      self.year ||= book.publish_date
      self.save!
    end
  end

  def self.create_or_update_book(book, creator)
    book.topics.each do |t|
      found = Topic.where(name: t).first
      if found.nil?
        Topic.create!(name: t, search_index: t, gitter_room: t, user: creator)
      end
    end
    link = Link.where(url: [book.amazon_link, book.goodreads_link, book.openlibrary_link, book.direct_link]).first
    if link.present?
      Rails.logger.info "Update 1 #{book.title}"
      link.item.update_book(book, creator)
    elsif (summary_link = Link.where(url: [book.four_minute_books_link, book.derek_sivers_link, book.blas_link]).first).present?
      Rails.logger.info "Update 2 #{book.title}"
      summary_link.item.update_book(book, creator)
    else
      Rails.logger.info "Create 1 #{book.title}"
      Item.create_book(book, creator)
    end
  end

  def self.search_by_isbn(isbn)
    isbn = isbn.gsub(" ","").gsub("-","")
    # ISBN is edition-specific
    Item.where(item_type_id: 'book').where("metadata::text like '%#{isbn}%'").first
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
        if page.at('meta[property="books:page_count"]')&.attributes
          page_count = page.at('meta[property="books:page_count"]')&.attributes["content"]&.value.to_i
        else
          page_count = nil
        end
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
        begin
          page = Nokogiri::HTML(open(url))
          title = page.at('title')&.content
          if title.blank? && url.end_with?(".pdf")
            title = File.basename(URI.parse(url).path).sub(".pdf", "").gsub("_", " ").gsub("-", " ")
          end
          canonical = page.at('link[rel="canonical"]')&.attributes && page.at('link[rel="canonical"]')&.attributes["href"]&.value
          {
            topics: [],
            canonical: canonical,
            title: title.to_s.strip
          }
        rescue Exception => ex
          Rails.logger.error "Error: #{ex.message} in extract_opengraph_data"
          {}
        end
      end
    end
  end

  def display_rating
    Review.display_rating(self.average_overall_score)
  end

  def display_name
    self.name
  end

  class CustomMarkdownRender < Redcarpet::Render::HTML
      def block_quote(quote)
        %(<blockquote class="my-custom-class">#{quote}</blockquote>)
      end

      def paragraph(text)
          %(<p class="mb-2">#{text}</p>)
      end

      def header(text, header_level)
          %(<h#{header_level} class="text-#{4-header_level}xl mt-2 mb-1 font-semibold">#{text}</h#{header_level}>)
      end

      def link(lk, target, content)
          %(<a class="underline text-blue-500 hover:text-blue-700" href="#{lk}" target="_blank">#{content}</a>)
      end
  end

  def display_blurb
    if self.is_syllabus?
      if self.topics.first.name == 'machine-learning'
        body = <<-HEREDOC
        <div class="mt-2 mb-4">
				We're currently running a <a href="/project-based-learning.html" target="_blank" class="underline text-blue-500">project-based learning program</a> for <b>Machine Learning for Managers</b>.
				There will be a peer group of learners, practitioner-experts for mentoring and helping you if you get stuck, and most importantly, 
				a meaningful project to accomplish by the end. The syllabus will be created from high-quality learning resources on the Web.
        <br><br>
        The program for Machine Learning for Managers is curated by <a href="http://jrajrohit.me/about/" target="_blank" class="underline text-blue-500">Jalem Raj Rohit</a> who is well-known expert in data-science, machine learning, NLP and DevOps circles such as StackOverflow, Kaggle, and other communities.
        You can <a href="https://www.twitter.com/data__wizard" target="_blank" class="underline text-blue-500">follow him on Twitter</a>.
        <br><br>
        <blockquote class="twitter-tweet"><p lang="en" dir="ltr">You bring your deep learning problems to me, I say &quot;your problem can be solved by an SVM&quot;, you pay me $10,000 for saving you $500,000. <a href="https://t.co/wQeLqMOxjF">https://t.co/wQeLqMOxjF</a></p>&mdash; Raj Rohit (@data__wizard) <a href="https://twitter.com/data__wizard/status/879387651563954176?ref_src=twsrc%5Etfw">June 26, 2017</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
        <br><br>
				Your first topic will be free of cost. All we ask for is that you help us spread the word about this program in your social networks
				and get at least 5 of your friends to join their own topics of interest.
			</div>
			<a class="btn btn-primary mx-auto bg-teal-500 text-white p-2 rounded text-center mb-4" target="_blank" href="https://join.slack.com/t/learnawesomeorg/shared_invite/zt-evhyahcw-FpHIMYqz3S7YkB54Aq2HPQ">Join our Slack</a><br>
HEREDOC
      elsif self.topics.first.name == 'programming-languages/scratch'
        body = <<-HEREDOC
        <div class="mt-2 mb-4">
				We're currently running a <a href="/project-based-learning.html" target="_blank" class="underline text-blue-500">project-based learning program</a> for <b>Scratch Programming for Kids</b>.
				There will be a peer group of learners, practitioner-experts for mentoring and helping you if you get stuck, and most importantly, 
				a meaningful project to accomplish by the end. The syllabus will be created from high-quality learning resources on the Web.
        <br><br>
        The program for Scratch programming for kids is curated by <a href="https://nilesh.trivedi.pw" target="_blank" class="underline text-blue-500">Nilesh Trivedi</a>.
        He's been programming for 15 years, and his 7yo daughter has been programming with Scratch for more than 2 years.
        You can <a href="https://www.twitter.com/nileshtrivedi" target="_blank" class="underline text-blue-500">follow him on Twitter</a>.
        <br><br>
        <blockquote class="twitter-tweet"><p lang="en" dir="ltr">I successfully managed to get my 6yo interested in Scratch programming. 😃 Here are the things she has created: <a href="https://t.co/X9eYaCQHlh">https://t.co/X9eYaCQHlh</a> <br><br>I&#39;m now mentoring a group of kids. Idea is to avoid common traps &amp; give a glimpse of some deep ideas. Join if interested (and please RT) 🙏 <a href="https://t.co/teC2WX9eXL">https://t.co/teC2WX9eXL</a></p>&mdash; Nilesh Trivedi (@nileshtrivedi) <a href="https://twitter.com/nileshtrivedi/status/1261593530524291072?ref_src=twsrc%5Etfw">May 16, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
        <br><br>
				Your first topic will be free of cost. All we ask for is that you help us spread the word about this program in your social networks
				and get at least 5 of your friends to join their own topics of interest.
			</div>
			<a class="btn btn-primary mx-auto bg-teal-500 text-white p-2 rounded text-center mb-4" target="_blank" href="https://join.slack.com/t/learnawesomeorg/shared_invite/zt-evhyahcw-FpHIMYqz3S7YkB54Aq2HPQ">Join our Slack</a><br>
HEREDOC
      elsif self.topics.first.name == 'cooking'
        body = <<-HEREDOC
        <div class="mt-2 mb-4">
				We're currently running a <a href="/project-based-learning.html" target="_blank" class="underline text-blue-500">project-based learning program</a> for <b>Cooking with Food Science</b>.
				There will be a peer group of learners, practitioner-experts for mentoring and helping you if you get stuck, and most importantly, 
				a meaningful project to accomplish by the end. The syllabus will be created from high-quality learning resources on the Web.
        <br><br>
        The program for Cooking with Home Science is curated by <a href="https://krishashok.me/" target="_blank" class="underline text-blue-500">Krish Ashok</a> 
        who is popular columnist and is currently working on a book about cooking with Penguin India.
        You can <a href="https://www.twitter.com/krishashok" target="_blank" class="underline text-blue-500">follow him on Twitter</a>.
        <br><br>
        <blockquote class="twitter-tweet"><p lang="en" dir="ltr">I am writing a book on food science for Indian cooking for <a href="https://twitter.com/PenguinIndia?ref_src=twsrc%5Etfw">@PenguinIndia</a> that should come out later this year. It will be a pop-science book that will explain in layman terms the chemistry of Indian food &amp; give you verified science tips on cooking delicious food in a home kitchen</p>&mdash; Krish Ashok (@krishashok) <a href="https://twitter.com/krishashok/status/1250078642194898945?ref_src=twsrc%5Etfw">April 14, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
        <br><br>
				Your first topic will be free of cost. All we ask for is that you help us spread the word about this program in your social networks
				and get at least 5 of your friends to join their own topics of interest.
			</div>
			<a class="btn btn-primary mx-auto bg-teal-500 text-white p-2 rounded text-center mb-4" target="_blank" href="https://join.slack.com/t/learnawesomeorg/shared_invite/zt-evhyahcw-FpHIMYqz3S7YkB54Aq2HPQ">Join our Slack</a><br>
HEREDOC
      elsif self.topics.first.name == 'fiction-writing'
        body = <<-HEREDOC
        <div class="mt-2 mb-4">
				We're currently running a <a href="/project-based-learning.html" target="_blank" class="underline text-blue-500">project-based learning program</a> for <b>Fiction Writing for Beginners</b>.
				There will be a peer group of learners, practitioner-experts for mentoring and helping you if you get stuck, and most importantly, 
				a meaningful project to accomplish by the end. The syllabus will be created from high-quality learning resources on the Web.
        <br><br>
        The program for Fiction Writing for Beginners is curated by <a href="https://neelimavinod.com/" target="_blank" class="underline text-blue-500">Neelima Vinod</a>
        whose Young Author Program has been very well-received and was recently even featured on Business Line.
        You can <a href="https://www.twitter.com/neelthemuse" target="_blank" class="underline text-blue-500">follow her on Twitter</a>.
        <br><br>
        <blockquote class="twitter-tweet"><p lang="en" dir="ltr">The Young Author Program Anthology was featured in Business Line! Thanks so much <a href="https://twitter.com/Swati_Sanyal_T?ref_src=twsrc%5Etfw">@Swati_Sanyal_T</a><br> <br>You can buy the ebook here: <a href="https://t.co/2dB3LBEveV">https://t.co/2dB3LBEveV</a><br><br>Read the feature here: <a href="https://t.co/kOiPd2ge0a">https://t.co/kOiPd2ge0a</a><a href="https://twitter.com/pothidotcom?ref_src=twsrc%5Etfw">@pothidotcom</a> <a href="https://twitter.com/hashtag/Anthology?src=hash&amp;ref_src=twsrc%5Etfw">#Anthology</a> <a href="https://twitter.com/hashtag/childrensbook?src=hash&amp;ref_src=twsrc%5Etfw">#childrensbook</a> <a href="https://twitter.com/hashtag/quarantine2020?src=hash&amp;ref_src=twsrc%5Etfw">#quarantine2020</a></p>&mdash; Neelima (@neelthemuse) <a href="https://twitter.com/neelthemuse/status/1246642896263983106?ref_src=twsrc%5Etfw">April 5, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
        <br><br>
				Your first topic will be free of cost. All we ask for is that you help us spread the word about this program in your social networks
				and get at least 5 of your friends to join their own topics of interest.
			</div>
			<a class="btn btn-primary mx-auto bg-teal-500 text-white p-2 rounded text-center mb-4" target="_blank" href="https://join.slack.com/t/learnawesomeorg/shared_invite/zt-evhyahcw-FpHIMYqz3S7YkB54Aq2HPQ">Join our Slack</a><br>
HEREDOC
      end
      return body.html_safe
    end
  end

  def display_description
    # TODO: Why not allow markdown for all item descriptions instead of only syllabuses?
    # Could lead to styling abuse by using headings, links, lists etc
    if self.is_syllabus?
      # this is a native learning plan
      markdown = Redcarpet::Markdown.new(CustomMarkdownRender)
      html = markdown.render(self.description.to_s.strip).html_safe
      return html #self.replace_la_links_with_embeds(html)
    else
      return self.description.to_s.strip
    end
  end

  def replace_la_links_with_embeds(html)
    # detect all URLs to items in given html string and replace them with their content_html
    pattern = /(https?:\/\/[a-z.]+(:3000)?\/items\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})(-[a-zA-Z0-9\-_]+)?)/
    html.scan(pattern).each do |match|
      # match = [url, port, itemid, idsuffix]
      html.sub!(match.first, Item.find(match[2]).content_html(match.first))
    end
    html.html_safe
  end

  def content_html(url)
    "<a href=\"" + url + "\" target='_blank'>" + self.display_name + "</a><br/>"
    # + "<iframe src='" + self.embed_url + "' width=600 height=600></iframe><br/>"
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

  def notify_gitter
    if Rails.env.production?
      item_url = Rails.application.routes.url_helpers.item_url(self)
      message = "New #{self.item_type} added in #{self.topics.map(&:name).join(',')}: #{self.name}: #{item_url}"
      self.topics.map { |t| t.gitter_room_id.presence || '5ca7a4aed73408ce4fbced18'}.compact.uniq.each do |room_id| # learn-awesome/community
        GitterNotifyJob.perform_later(message,room_id)
      end
    end
  end

  def update_points
    UserPointsService.call(self.user)
  end

  def self.suggest_format(url)
    return "video" if ["youtube.com", "vimeo.com", "youtu.be"].any? { |dom| url.include?(dom) }
    return "wiki" if ["wikipedia.org"].any? { |dom| url.include?(dom) }
    return "book" if ["goodreads.com"].any? { |dom| url.include?(dom) }
    return "course" if ["classcentral.com", "coursera.org", "edx.org"].any? { |dom| url.include?(dom) }
    return "article"
  end

  def embed_url
    if self.links.any? { |l| l.url.include?("youtube.com") or l.url.include?("vimeo.com") or l.url.include?("youtu.be") }
      Item.video_embed(self.links.select { |l| 
        l.url.include?("youtube.com") or l.url.include?("vimeo.com") or l.url.include?("youtu.be") }.first.url)
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

  def recommended_items(user)
    [Item.discover]    
  end

  def primary_link
    self.links.first
  end
end
