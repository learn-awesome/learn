require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'

class GoodReads
	def self.extract(book)
		puts "\nGoodReads start: #{book}"
		return book if book.goodreads_link.blank? and book.goodreads_id.blank? and book.isbn.blank? and book.isbn13.blank?
		if book.goodreads_link.present?
			# do nothing
		elsif book.goodreads_id.present?
			book.goodreads_link = "https://www.goodreads.com/book/show/" + book.goodreads_id
		end
		page = Nokogiri::HTML(open(book.goodreads_link))
		book.goodreads_link = page.at('link[rel="canonical"]')&.attributes["href"]&.value
		book.description = (page.css("div#description") > "span:last").inner_text
		book.topics = page.css("a.bookPageGenreLink").map {|n| n.attributes["href"]&.value }.select { |s| s.start_with?("/genres/") }.map { |s|
          s.gsub("/genres/","")
        }.compact - ["self-help","non-fiction"] # business, productivity
        puts "\nGoodReads finish: #{book}"
        return book
	end

	def self.search(book)
	end
end