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

=begin
// /_next/data/OobI_r5osFBZZ3qHQV04X/experts.json
let experts = window.__NEXT_DATA__.props.pageProps.data.topRecommenders;

// /mike-rowe-books

let recos = Array.from(document.querySelectorAll('div#maincontent div.tab-pane')[0].querySelectorAll('li')).map((li) => ({
  cover: li.querySelector('img').src,
  genius_link: li.querySelector('a').href,
  title: li.querySelector('h3').innerText,
  author: li.querySelector('h4').innerText,
  review: li.querySelector('p').innerText.replace("Source:",""),
  source: li.querySelector('p a').href
}));
=end