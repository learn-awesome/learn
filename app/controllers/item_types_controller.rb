class ItemTypesController < ApplicationController
	def show
		@item_type = ItemType.find(params[:id])
		@topic_name = params[:topic]
		@length = params[:length]
		@quality = params[:quality]

		if @item_type.nil?
			flash[:danger] = "We couldn't find this format."
			redirect_to root_path and return
		end

		# TODO: Personalize this query based on topics and reviewers the user is following.
		@item_type_items = Item
			.where(item_type_id: @item_type.id)
			.where((topic = Topic.where(name: @topic_name).first) && {id: topic.items.map(&:id)})
			.where(Review::QUALITY_TAGS.include?(@quality) && "#{@quality}_score >= 4.0")
			.where(@length.present? && ["case when time_unit = 'minutes' then estimated_time when time_unit = 'hours' then estimated_time * 60 end between :start and :finish", {start: @length.split("-").first.to_i, finish: @length.split("-").last.to_i}])
			.order("overall_score DESC")
			.limit(200)
			.sort_by { |i| i.topics.first.followers_count.to_i * -1 }
			.paginate(page: params[:page])

		# @item_type_items = Item.advanced_search(@topic_name, @item_type, @length, @quality, nil, nil, nil, nil, nil, 100).sort_by { |i| i.topics.first.followers_count.to_i * -1 }.paginate(page: params[:page])
	end

	def index
	end

	def discover
		item_type = ItemType.discover
		if item_type
		  redirect_to item_type
		else
		  flash[:danger] = "No formats exist."
		  redirect_to root_path
		end
	end
end
