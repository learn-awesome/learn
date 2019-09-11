namespace :import do
  desc "Create fake people in the database"
  task :people  => :environment do |_task, _args|
    1000.times do
      Person.create!(name: Faker::Name.name, description: Faker::Quote.most_interesting_man_in_the_world, website: 'www.google.com', email: Faker::Internet.email)
    end
  end
end
