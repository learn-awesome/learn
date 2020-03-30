class Book
	include ActiveModel::Model
	attr_accessor :title, :isbn, :isbn13, :author_name, :author_link
	attr_accessor :amazon_link, :openlibrary_link, :google_books_link
	attr_accessor :learn_awesome_id, :four_minute_books_link, :fmb_summary_length
	attr_accessor :number_of_pages, :publish_date, :cover_image
	attr_accessor :goodreads_id, :goodreads_link, :description, :topics
	attr_accessor :derek_sivers_link, :derek_sivers_description, :derek_sivers_rating
	attr_accessor :direct_link, :skip_post_amazon_scrape, :blas_link

	def self.load_json(json_file_name, creator)
		return if json_file_name.blank?
		books = JSON.parse(File.read(json_file_name))
		failed = []
		books.each do |book|
			begin
				book_model = Book.new(book)
				if book_model.author_link.present? && book_model.author_name.blank?
					book_model.author_name = "Author of #{book_model.title}"
				end
				Rails.logger.info "Processing #{book_model.title}"
				Item.create_or_update_book(book_model, creator)
			rescue Exception => ex
				failed << book['title']
			end
		end
		return failed
	end

	def self.import_four_minute_book_summaries(old_file_name, new_file_name)
		parsed_books = JSON.parse(File.read(old_file_name))
		books = FourMinuteBooks.list # title and four_minut_books_link

		books = books.map { |nb|
			if parsed_books.select { |ob| ob['title'] == nb.title }.first
				puts "Found #{nb.title} in previous json"
				bookobj = Book.new
				bookobj.attributes = parsed_books.select { |ob| ob['title'] == nb.title }.first
				bookobj
			else
				FourMinuteBooks.extract(nb)
			end
		}

		books = books.map { |nb|
			if nb.isbn.blank?
				Amazon.extract(nb)
			else
				puts "skipping amazon scrape for #{nb.title}"
				nb.skip_post_amazon_scrape = true
				nb
			end
		}

		books = books.map { |b| OpenLibrary.extract(b) }

		books = books.map { |b| GoodReads.extract(b) }

		books = books.map { |b| DerekSivers.extract(b) }

		# books.each { |b| Item.create_or_update_book(b) }
		if new_file_name.present?
			File.open(new_file_name,"w") do |f|
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

	def self.import_blas(creator)
		require 'nokogiri'
		data = JSON.parse(File.read('blas.json'))['data']
		data.each do |book| # has keys: "__attributes", "image", "title", "excerpt", "tags", "date", "tags_hfilter"
			title = Nokogiri::HTML(book['title']).at('a').text
			puts "Now processing: #{title}"
			if title == "Mistakes Were Made (but not by me) by Carol Tavris and Elliot Aronson" # by is usually followed by author name
				btitle = title
				auname = nil
			else
				btitle = title.split(" by ").first
				auname = title.split(" by ")[1]
			end
			book_model = Book.new(
				title: btitle,
				author_name: auname,
				blas_link: Nokogiri::HTML(book['title']).at('a')['href'],
				description: Nokogiri::HTML(book['excerpt']).at('p').text.sub("Summary ", ""),
				topics: Nokogiri::HTML(book['tags']).search('a').map(&:text).map(&:downcase).map do |s| s.gsub(" ", "-").gsub("&","").gsub(".","").gsub("'","").gsub("\"",""); end,
				cover_image: Nokogiri::HTML(book['image']).at('img').try('[]', 'src')
			)
			puts "Now processing: #{book_model.title} by #{book_model.author_name}"
			Item.create_or_update_book(book_model, creator)
		end
	end
	
end
