class DatabaseCheckJob < ApplicationJob
  queue_as :default

  def perform(review_id)
  	begin
  		ideas_without_topics = IdeaSet.pluck(:id) - TopicIdeaSet.distinct.pluck(:idea_set_id)
  		items_without_links  = Item.where.not(item_type_id: 'learning_plan').pluck(:id) - Link.distinct.pluck(:item_id)
      ideas_without_items  = IdeaSet.pluck(:id) - Item.distinct.pluck(:idea_set_id)
      duplicate_links = Link.select([:url]).group(:url).having("count(id) > 1").map(&:url)
  		# TODO
      # Reviews where all the score, status, notes and tags fields are missing
  		# topics without wiki entry
	rescue Exception => ex
		Rails.logger.error("Error in DatabaseCheckJob: #{ex.message}")
	end
  end
end
