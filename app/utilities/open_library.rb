require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'
require 'httparty'

class OpenLibrary
	def self.search(book)
		if book.title.present?
			# documentation: https://openlibrary.org/dev/docs/api/search
			resp = HTTParty("https://openlibrary.org/search.json?title=brief+history+of+time")
			data = JSON.parse(resp.body)
		end
	end

	def self.extract(book)
		puts "\nOpenLibrary start: #{book}"
		# https://openlibrary.org/api/books?bibkeys=ISBN:0385472579,LCCN:62019420&format=json&jscmd=data
		if book.isbn.present?
			resp = HTTParty.get("https://openlibrary.org/api/books?bibkeys=ISBN:#{book.isbn}&format=json&jscmd=data")
		elsif book.isbn13.present?
			resp = HTTParty.get("https://openlibrary.org/api/books?bibkeys=ISBN13:#{book.isbn13}&format=json&jscmd=data")
		else
			return book
		end
		data = JSON.parse(resp.body).values.first
		return book if data.blank?
		book.openlibrary_link = data["url"]
		if data["identifiers"].present? and data["identifiers"]["goodreads"].present?
			book.goodreads_id = data["identifiers"]["goodreads"][0]
		end
		book.number_of_pages = data["number_of_pages"]
		book.cover_image = data["cover"]["medium"] if data["cover"].present?
		book.author_name = data["authors"][0]["name"] if data["authors"].present? and data["authors"][0].present?
		puts "\nOpenlibrary finish: #{book}"
		return book
	end
end