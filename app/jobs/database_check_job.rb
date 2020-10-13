class DatabaseCheckJob < ApplicationJob
  queue_as :default

  def perform
  	begin
      ideas_without_topics = IdeaSet.pluck(:id) - TopicIdeaSet.distinct.pluck(:idea_set_id)
      topics_without_ideas = Topic.pluck(:id) - TopicIdeaSet.distinct.pluck(:topic_id) # can be deleted unless they have children topics
      items_without_links  = Item.where.not(item_type_id: 'learning_plan').pluck(:id) - Link.distinct.pluck(:item_id)
      ideas_without_items  = IdeaSet.pluck(:id) - Item.distinct.pluck(:idea_set_id)
      duplicate_links = Link.select([:url]).group(:url).having("count(id) > 1").map(&:url)
      
      books = Item.where(item_type_id: 'book').all

      books_without_goodreads = []
      books_without_amazoncom = []
      books_without_amazonin = []
      books_without_isbn = []

      books.each do |book|
        books_without_goodreads << book.id if book.links.where("url like '%goodreads.com%'").count == 0
        books_without_amazoncom << book.id if book.links.where("url like '%amazon.com%'").count == 0
        books_without_amazonin << book.id if book.links.where("url like '%amazon.in%'").count == 0
        books_without_isbn << book.id if book.isbn.nil?
      end

      amazon_links_without_tag = Rails.env.production? ? Link.where("url like '%amazon.com%' or url like '%amazon.in%'").where("url not like '%tag=learnawesome-2%'").pluck(:url) : []

      reserved_usernames = User.where(nickname: ['learnawesome', 'admin', 'root']).count > 1

      # TODO
      # Reviews where all the score, status, notes and tags fields are missing
      # topics without wiki entry

      result = {
        ideas_without_topics: ideas_without_topics,
        topics_without_ideas: topics_without_ideas,
        items_without_links: items_without_links,
        ideas_without_items: ideas_without_items,
        duplicate_links: duplicate_links,
        amazon_links_without_tag: amazon_links_without_tag,
        reserved_usernames: reserved_usernames
      }
      Rails.logger.info "DatabaseCheckJob: #{result.inspect}"
    rescue Exception => ex
      Rails.logger.error("Error in DatabaseCheckJob: #{ex.message}")
    end
  end
end
