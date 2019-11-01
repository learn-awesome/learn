class TopicsController < ApplicationController
	include Secured
  	before_action :logged_in_using_omniauth?, only: [:toggle_follow, :new, :create]

	def index
      respond_to do |format|
        format.html
        format.json { render json: Topic.all }
      end
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
		@item_type = params[:item_type]
		@length = params[:length]
		@quality = params[:quality]
		@topic = Topic.from_param(params[:id])
		if @topic.nil?
	      flash[:danger] = "We couldn't find this topic."
	      redirect_to root_path and return
		end
		if current_user
			@user_topics = current_user.user_topics
			@does_follow = @user_topics.find { |ut| (ut.topic_id == @topic.id) && (ut.action == 'follow') }
		end
		@item_type_items = @topic.advanced_search(@item_type, @length, @quality).group_by(&:item_type).sort.to_h
	end

	def toggle_follow
		@topic = Topic.from_param(params[:id])
		if current_user
			@user_topics = current_user.user_topics
			@topic_action = @user_topics.find { |ut| ut.topic_id == @topic.id }
			if @topic_action
				@topic_action.destroy
			else
				@user_topics.create!(topic: @topic, action: "follow")
			end
		end
		redirect_to @topic
	end

	def search
		fuzzy_results = Topic.fuzzy_search(params[:q]).limit(10)
		results = fuzzy_results.empty? ? Topic.search(params[:q]) : fuzzy_results
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

	def merge
		@topic = Topic.from_param(params[:id])
	end
end
