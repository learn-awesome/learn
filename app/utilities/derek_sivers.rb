require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'

class DerekSivers
	def self.extract(book)
		puts "\nDerekSivers start: #{book}"
		found = search(book)
		if found
			book.derek_sivers_link = found.derek_sivers_link
			book.derek_sivers_description = found.derek_sivers_description
			# book.derek_sivers_rating = found.derek_sivers_rating
			book.cover_image ||= found.cover_image
		end
		puts "\nDerekSivers finish: #{book}"
		return book
	end

	def self.search(book)
		self.list.find { |x|
			x.title.downcase.include?(book.title.downcase)
		}
	end

	def self.list
		doc = Nokogiri::HTML(open("https://sivers.org/book"))
		doc.css('section#allbooks div.abook').map { |d|
			Book.new(
				# TODO extract link to amazon page
				title: d.css('h2 a').text,
				derek_sivers_link: ("https://sivers.org" + d.css('h2 a').first[:href]),
				derek_sivers_description: d.css('p').first.text,
				cover_image: ("https://sivers.org" + d.css('figure a img').first[:src])
			)
		}
	end
end