require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'
require 'net/http'

class Amazon
	def self.extract(book)
		return book if book.amazon_link.blank?
		# https://amzn.to/2Im4lfU
		puts "\nAmazon start: #{book}"
		tries = 5
		begin
			proxy_link = URI("https://api.proxycrawl.com")
			proxy_link.query = URI.encode_www_form({
				token: "",
				url: book.amazon_link
			})
			# res = Net::HTTP.get_response(proxy_link)
			page = Nokogiri::HTML(open(proxy_link))
			book.isbn = page.css('table#productDetailsTable ul').at('li:contains("ISBN")').text.gsub("ISBN-10: ","")
			book.amazon_link = page.at('link[rel="canonical"]')['href']
		rescue Exception
			tries -= 1
			retry if tries > 0
		end

		puts "\nAmazon finish: #{book}"
		return book
	end

	def self.search(book)
	end
end
