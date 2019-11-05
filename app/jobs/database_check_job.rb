class DatabaseCheckJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
  		ideas_without_topics = IdeaSet.pluck(:id) - TopicIdeaSet.distinct.pluck(:idea_set_id)
  		items_without_links  = Item.pluck(:id) - Link.distinct.pluck(:item_id)
      ideas_without_items  = IdeaSet.pluck(:id) - Item.distinct.pluck(:idea_set_id)
  		# TODO
  		# topics without wiki entry
	rescue Exception => ex
		Rails.logger.error("Error in DatabaseCheckJob: #{ex.message}")
	end
  end
end
