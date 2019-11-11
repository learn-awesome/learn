require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'

class GoogleBooks
	def self.search(book)
		# https://www.google.co.in/search?tbo=p&tbm=bks&q=isbn:0199487618
	end

	def self.extract(book)
		# https://books.google.co.in/books?id=x_9KvAEACAAJ&dq=isbn:0199487618&hl=en&sa=X&ved=0ahUKEwj6opPLteHlAhWRSH0KHfSyBHkQ6AEIKjAA
	end

	def self.list
	end
end