class Book
	include ActiveModel::Model
	attr_accessor :title, :isbn, :isbn13, :author_name, :author_link
	attr_accessor :amazon_link, :openlibrary_link, :google_books_link
	attr_accessor :learn_awesome_id, :four_minute_books_link, :fmb_summary_length
	attr_accessor :number_of_pages, :publish_date, :cover_image
	attr_accessor :goodreads_id, :goodreads_link, :description, :topics
	attr_accessor :derek_sivers_link, :derek_sivers_description, :derek_sivers_rating
	attr_accessor :direct_link

	def self.load_json(json_file_name)
		return if json_file.blank?
		books = JSON.parse(File.read(json_file))
		books.each do |book|
			book_model = Book.new.from_json(book.to_json)
			Item.create_or_update_book(b)
		end
	end

	def self.import_four_minute_book_summaries(json_file_name)
		books = FourMinuteBooks.list[0..2] # title and four_minut_books_link
		books = books.map { |b| FourMinuteBooks.extract(b) }
		books = books.map { |b| Amazon.extract(b) }
		books = books.map { |b| OpenLibrary.extract(b) }
		books = books.map { |b| GoodReads.extract(b) }
		books = books.map { |b| DerekSivers.extract(b) }
		# books.each { |b| Item.create_or_update_book(b) }
		if json_file_name.present?
			File.open(json_file_name,"w") do |f|
				f.write(JSON.pretty_generate(books.map(&:as_json)))
			end
		end
		return books
	end

	def self.import_sivers_book_summaries
		books = DerekSivers.list
		books = books.map { |b| DerekSivers.extract(b) }
		books = books.map { |b| Amazon.extract(b) }
		books = books.map { |b| OpenLibrary.extract(b) }
		books = books.map { |b| GoodReads.extract(b) }
		books.each { |b| Item.create_or_update_book(b) }
	end

	def to_s
		self.inspect
	end
end
