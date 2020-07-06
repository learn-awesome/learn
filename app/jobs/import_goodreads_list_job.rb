require 'nokogiri'
require 'httparty'
require 'uri'
require 'open-uri'
require 'redcarpet'

class ImportGoodreadsListJob < ApplicationJob
  queue_as :default

  def perform(list_url, creator_id = nil, collection_id = nil)
    # eg: https://www.goodreads.com/list/show/150014.Stripe_Press_Books
    page = Nokogiri::HTML(URI.open(list_url))
    creator = creator_id.present? ? User.find(creator_id) : User.learnawesome
    collection = Collection.find(collection_id) if collection_id.present?

    books = page.css('table.tableList tr').map { |n|
      # begin
        book_model = Book.new(
          goodreads_link: "https://www.goodreads.com" + n.at('a.bookTitle').attributes['href']&.value,
          title: n.at('a.bookTitle span')&.text,
          cover_image: n.at('img.bookCover').attributes['src']&.value,
          author_link: n.at('a.authorName').attributes['href']&.value,
          author_name: n.at('a.authorName span').text
          # goodreads_rating: n.at('span.minirating').text.strip
        )
        book_model = GoodReads.extract(book_model) # finds topics from book page
        Item.create_or_update_book(book_model, creator, collection)
			# rescue Exception => ex
			# 	puts "Could not import #{n.at('span')&.text}: #{ex.message}"
			# end
    }
  end
end
