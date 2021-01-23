require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'
require 'net/http'
require 'httparty'

class Amazon
	def self.extract(book)
		return book if book.amazon_link.blank?
		# https://amzn.to/2Im4lfU
		puts "\nAmazon start: #{book}"

		proxy_link = URI("https://api.proxycrawl.com")
		proxy_link.query = URI.encode_www_form({
			token: ENV['PROXYCRAWL_TOKEN'],
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

	def self.extract_proxycrawl(book)
		return book if book.amazon_link.blank?
		puts "\nAmazon crawl start: #{book}"

		proxy_link = URI("https://api.proxycrawl.com/scraper")
		proxy_link.query = URI.encode_www_form({
			token: ENV['PROXYCRAWL_TOKEN'],
			url: book.amazon_link
			# scraper: "amazon-product-details"
		})

		begin
			data = JSON.parse(HTTParty.get(proxy_link.to_s).body)['body']
			return book if data.nil?
			book.amazon_link = data['canonicalUrl']
			book.isbn = data['productInformation'].detect { |m| m['name'] == "ISBN-10"}["value"]
			book.isbn13 = data['productInformation'].detect { |m| m['name'] == "ISBN-13"}["value"]
			book.cover_image = data['mainImage']
			book.title = data['name']
			book.price = data['price']
			book.description = data['description']
		rescue Exception => ex
			puts "Error: #{ex}"
			puts ex.backtrace
		end

		puts "\nAmazon finish: #{book}"
		return book
	end
end
