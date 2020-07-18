require 'uri'

class AmazonCountryJob < ApplicationJob
    queue_as :default
  
    def perform(*args)
        Link.where("url like '%amazon.com%'").each do |link|
            in_link = link.item.links.where("url like '%amazon.in%'").first
            if in_link.nil?
                link.item.links.create(url: link.url.sub("amazon.com","amazon.in").sub("tag=learnawesome-20","tag=learnawesome-21"))
            end
        end

        Link.where("url like '%amazon.in%'").each do |link|
            us_link = link.item.links.where("url like '%amazon.com%'").first
            if us_link.nil?
                link.item.links.create(url: link.url.sub("amazon.in","amazon.com").sub("tag=learnawesome-21","tag=learnawesome-20"))
            end
        end

        puts "Done"
    end
end