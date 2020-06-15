namespace :springer do
    desc "Import topics and items from springer.rake"
    task :import => :environment do
        puts "Starting"
        data = File.read('springer.txt')
        books = data.split("\n\n")
        puts "Found #{books.size} books"
        eshnil = User.find('8a16a2e4-dcb7-4167-a2a2-51d3af9d1613')
        collection = Collection.find('6f9b4ec2-9968-432b-86f6-f4c0b66542b3')

        books.each do |book|
            topics,title,author,link = book.split("\n")
            puts "processing #{title} with #{link}"
            idea_set = IdeaSet.create!(name: title, description: author)
            puts "created idea_set"
            item = Item.create!(
                idea_set: idea_set,
                name: title,
                item_type_id: 'book',
                allow_without_links: true,
                user: eshnil
            )
            puts "created item"
            topics.split(",").each do |t|
               topic = Topic.find_or_create_by!(display_name: t)
               TopicIdeaSet.find_or_create_by!(topic: topic, idea_set: idea_set)
            end
            puts "found topics"
            Link.find_or_create_by!(item: item, url: link)
            puts "created Item #{item.name} with #{link}"
            collection.collection_items.create!(item: item)
        end
    end
end