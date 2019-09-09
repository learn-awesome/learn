require 'csv'

namespace :addtopics do
  desc "Add topics from CSV"
  task :addtopics, [:file_name] => :environment do |task, args|
  	topics = CSV.read(args[:file_name]).flatten.uniq.map(&:downcase)
  	topics.each do |t|
  		Topic.find_or_create_by(name: t) do |topic|
  			topic.search_index = t
  			topic.gitter_room = t
  		end
  	end
  end

  desc "Add items from csv"
  task :additems, [:file_name] => :environment do |task, args|
    items = CSV.read(args[:file_name]) # name,institute,provider,link,classlink,finallink,cleanlink,topics
    item_type = ItemType.where(id: 'course').first
    user = User.where(id: "8a16a2e4-dcb7-4167-a2a2-51d3af9d1613").first || User.where(nickname: "learnawesome").first

    items.each do |row|
      name = row[0]
      institute = row[1]
      provider = row[2]
      link = row[3]
      cleanlink = row[6]
      description = "By #{institute} via #{provider}"

      topics = row[7].split("-").map { |r| Topic.where(name: r).first }.compact

      puts "Creating for #{name}"

      idea_set = IdeaSet.new
      idea_set.name = name
      idea_set.description = description
      idea_set.save

      topics.each do |t|
        TopicIdeaSet.create(topic_id: t.id, idea_set: idea_set)
      end

      item = Item.new(name: name, item_type_id: item_type.id, description: description)
      item.user = user
      item.idea_set = idea_set

      item.links.build
      item.links.first.url = cleanlink
      item.links.build
      item.links.last.url = link

      unless item.save
        puts "Error: #{item.errors.inspect}"
      end

    end
  end
end