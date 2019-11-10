require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'

class Amazon
	def self.extract(book)
		return book if book.amazon_link.blank?
		# https://amzn.to/2Im4lfU
		puts "\nAmazon start: #{book}"
		page = Nokogiri::HTML(open(book.amazon_link, "User-Agent"=>"curl/7.58.0"))
		book.isbn = page.css('table#productDetailsTable ul').at('li:contains("ISBN")').text.gsub("ISBN-10: ","")

		puts "\nAmazon finish: #{book}"
		return book
	end

	def self.search(book)
	end
end