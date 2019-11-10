require 'uri'
require 'nokogiri'
require 'open-uri'
require 'redcarpet'

class FourMinuteBooks
	def self.search(book)
		self.list.find { |x|
			x[:title] == book.title
		}
	end

	def self.list
		doc = Nokogiri::HTML(open("https://fourminutebooks.com/book-summaries/"))
		doc.css('li a.post_title').map { |li|
			Book.new(title: li.text.gsub(" Summary", ""), four_minute_books_link: li[:href])
		}
	end

	def self.extract(book)
		puts "\nFourMinuteBooks start: #{book}"
		page = Nokogiri::HTML(open(book.four_minute_books_link))
		book.amazon_link = page.at('a[href*="amzn.to"]')[:href]
		book.author_link = page.at('a[text()*="Learn more about the author"]')[:href]
		book.fmb_summary_length = page.at('strong[text()*="Read in"]').parent.text().scan(/Read in: (\d+) minutes/).first.first.to_i
		puts "\nFourMinuteBooks finish: #{book}"
		return book
	end
end