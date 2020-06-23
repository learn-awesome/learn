require 'json'
require 'open-uri'
require 'httparty'

namespace :readnext do
    desc "Import recommendations"
    task :import => :environment do
        people = JSON.parse(File.read("readnext.json")) # image, name and URL for books json
        puts "Processing #{people.size} items"
        learnawesome = User.learnawesome
        people.each do |p|
            # download = URI.open(p['image'])
            # IO.copy_stream(download, "/Users/helix/assets/people/#{download.base_uri.to_s.split('/')[-1]}")
            puts "Person: #{p['name']}"
            image_url = "https://learn-awesome.github.io/assets/people/" + p['image'].to_s.split('/')[-1]
            person = Person.where(name: p['name']).first
            if person
                person.update!(image_url: image_url, kind: p['category'])
            else
                puts "Creating person"
                person = Person.create!(name: p['name'], image_url: image_url, kind: p['category'])
            end

            books = HTTParty.get(p['url'].sub("read-next.com/recommended","read-next.com/books/recommended") + ".json").parsed_response
            # objects with these keys: ["Book Name", "Goodreads Link", "Genre", "Author", "ISBN", "ImageURL", "Rating", "Pages", "Goodreads Title", "Formula"]
            books.each do |book|
                puts "Book: #{book['Book Name']}"
                link = Link.where(url: book['Goodreads Link']).first
                if link # book found
                    item = link.item
                    item.image_url = book['ImageURL']
                    item.page_count = book['Pages']
                    item.isbn = book['ISBN']
                    item.goodreads_rating = book['Rating']
                    item.name = book['Book Name']
                    item.description = item.description.presence || "By #{book['Author']}"
                    item.user ||= learnawesome
                    puts "failed: #{item.errors.first}" unless item.save
                else
                    idea_set = IdeaSet.create!(name: book['Book Name'], description: "By #{book['Author']}")
                    item = Item.new(idea_set: idea_set)
                    item.links.build(url: book['Goodreads Link'])
                    item.image_url = book['ImageURL']
                    item.page_count = book['Pages']
                    item.isbn = book['ISBN']
                    item.goodreads_rating = book['Rating']
                    item.name = book['Book Name']
                    item.item_type_id = 'book'
                    item.description = "By #{book['Author']}"
                    item.user = learnawesome
                    puts "failure: #{item.errors.first}" unless item.save

                    #TODO: Can we figure out topics from genre tags?
                end

                unless Recommendation.where(person: person, idea_set: item.idea_set).first
                    Recommendation.create!(person: person, idea_set: item.idea_set)
                end
            end
        end
    end
end