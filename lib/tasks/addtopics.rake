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
end