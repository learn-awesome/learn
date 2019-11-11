class DeleteBrokenLinks < ApplicationJob
  queue_as :default

  def perform
  	Link.all.each do |l|
  		next unless link.is_broken?
  		if link.item.links.count > 1
  			puts "Deleting #{link.url}"
  			link.destroy
  		else# only 1 link
  			puts "Deleting #{link.item.idea_set.id}: #{link.item.idea_set.name}"
  			link.item.idea_set.destroy
  		end
  	end
  end
end