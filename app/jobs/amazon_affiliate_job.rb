require 'uri'

class AmazonAffiliateJob < ApplicationJob
    queue_as :default
  
    def perform(*args)
        Link.where("url like '%amazon.com%' or url like '%amazon.in%'").where("url not like '%tag=learnawesome-2%'").each do |link|
            puts "Found #{link.item.id}: #{link.item.name}"
            # Add tag=learnawesome-20 or tag=learnawesome-21
            if link.url.include?("amazon.com")
                tag_value = "learnawesome-20"
            elsif link.url.include?("amazon.in")
                tag_value = "learnawesome-21"
            end

            if tag_value
                uri = URI.parse(link.url)
                new_query_ar = URI.decode_www_form(uri.query || '').reject { |p| p.first == "tag" } << ["tag", tag_value] 
                uri.query = URI.encode_www_form(new_query_ar)
                link.url = uri.to_s
                unless link.save
                    puts "Error #{link.id}: #{link.errors.first}"
                end
            end
        end
        puts "Done"
    end
end