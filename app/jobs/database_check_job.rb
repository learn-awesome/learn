class DatabaseCheckJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
  		ideas_without_topics = IdeaSet.pluck(:id) - TopicIdeaSet.pluck(:idea_set_id)
  		items_without_links  = Item.pluck(:id) - Link.pluck(:item_id)
  		# TODO
  		# topics without wiki entry
	rescue Exception => ex
		Rails.logger.error("Error in DatabaseCheckJob: #{ex.message}")
	end
  end
end
