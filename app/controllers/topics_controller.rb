class TopicsController < ApplicationController
	include Secured
  	before_action :logged_in_using_omniauth?, only: [:toggle_follow, :new, :create]

	def index
	end

	def new
		@topic = Topic.new
		@topic.name = params[:name]
	end

	def create
		@topic = Topic.new
		@topic.name = params[:topic][:name]
		@topic.search_index = @topic.name
		if @topic.save
			redirect_to @topic
		else
			flash[:danger] = @topic.errors.first
			render :new
		end
	end

	def show
		@topic = Topic.from_param(params[:id])
		if current_user
			@user_topics = current_user.user_topics
			@does_follow = @user_topics.find { |ut| (ut.topic_id == @topic.id) && (ut.action == 'follow') }
		end
		@item_type_items = @topic.items.group_by(&:item_type).sort.to_h
	end

	def toggle_follow
		@topic = Topic.from_param(params[:id])
		if current_user
			@user_topics = current_user.user_topics
			@topic_action = @user_topics.find { |ut| ut.topic_id == @topic.id }
			if @topic_action
				@topic_action.destroy
			else
				@user_topics.create(topic: @topic, action: "follow")
			end
		end
		redirect_to @topic
	end

	def search
		results = Topic.search(params[:q])
		render :json => results.as_json(only: [:id, :name])
	end

	def discover
	    topic = Topic.discover
	    if topic
	      redirect_to topic
	    else
	      flash[:danger] = "No topics exist."
	      redirect_to root_path
	    end
	end
end
