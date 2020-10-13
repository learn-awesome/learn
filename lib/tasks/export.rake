require 'aws-sdk-s3'

namespace :json do
    desc "Export all data to JSON files"
    task :export => :environment do
        s3 = Aws::S3::Resource.new
        bucket = s3.bucket('learnawesome-export')
        obj = bucket.object('dataset.json')
        json = { topics: Topic.all, idea_sets: IdeaSet.all, experts: Person.all }.to_json
        obj.put(body: json)
        puts "Done uploading"
    end
end