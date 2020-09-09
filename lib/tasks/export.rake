namespace :json do
    desc "Export all data to JSON files"
    task :export => :environment do
        file = File.open(File.join(Rails.root, "public", "dataset.json"), 'w')
        json = { topics: Topic.all, idea_sets: IdeaSet.all, experts: Person.all }.to_json
        file.write json
    end
end