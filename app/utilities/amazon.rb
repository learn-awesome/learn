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

		proxy_link = URI("https://api.proxycrawl.com")
		proxy_link.query = URI.encode_www_form({
			token: "Xgm1svgrqWW4uz6k3iEPrg",
			url: book.amazon_link
		})
		# res = Net::HTTP.get_response(proxy_link)
		begin
			page = Nokogiri::HTML(open(proxy_link))
			isbn_li = page.css('table#productDetailsTable ul').at('li:contains("ISBN")')
			book.isbn = isbn_li && isbn_li.text.gsub("ISBN-10: ","")
			if page.at('link[rel="canonical"]')
				book.amazon_link = page.at('link[rel="canonical"]')['href']
			else
				puts "canonical not found!"
			end
		rescue Exception => ex
			puts "Error: #{ex}"
		end

		puts "\nAmazon finish: #{book}"
		return book
	end

	def self.search(book)
	end
end
