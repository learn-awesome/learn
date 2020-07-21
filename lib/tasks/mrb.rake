require 'csv'

namespace :mrb do
    desc "Import Experts"
    task :import_experts => :environment do
        puts "Starting"
        data = CSV.read('mrb-recommenders.csv')[1..-1] # ignore the first row
        puts "Found #{data.size} experts"
        la = User.learnawesome

        data.each do |row|
            person = Person.where(name: row[2]).first
            if person
                puts "Found #{row[2]}"
                person.second_kind = row.first if person.kind != row.first
                person.image_url = row[1]
                unless person.save
                    puts "Error: #{person.errors.first}"
                end
            else
                puts "Creating #{row[2]}"
                Person.create!(name: row[2], kind: row.first, image_url: row[1])
            end
        end
    end
end