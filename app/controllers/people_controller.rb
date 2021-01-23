class PeopleController < ApplicationController
	include Secured
  	before_action :logged_in_using_omniauth?, except: [:show, :index, :discover]

	def new
		@person = Person.new
	end

	def create
		@person = Person.new
		@person.name = params[:person][:name]
		@person.description = params[:person][:description]
		@person.website = params[:person][:website]
		@person.email = params[:person][:email]
		@person.twitter = params[:person][:twitter]
		@person.goodreads = params[:person][:goodreads]
		@person.image_url = params[:person][:image_url]
		@person.wikipedia_url = params[:person][:wikipedia_url]
		@person.youtube_url = params[:person][:youtube_url]
		@person.kind = params[:person][:kind]

		if @person.save
			redirect_to person_path(@person)
		else
			flash[:error] = @person.errors.first
			redirect_back fallback_location: root_path
		end
	end

	def edit
		@person = Person.from_param(params[:id])
	end

	def wikidata
		@person = Person.from_param(params[:id])
		data = Person.wikidata_search(@person.name)
		@person.name = data[:name]
		@person.description = data[:description].to_s + "\n\n" + @person.description
		@person.image_url = data[:image_url]
		@person.website = data[:website]
		@person.goodreads = data[:goodreads] unless @person.goodreads.present?
		@person.twitter = data[:twitter]

		render 'edit'
	end

	def update
		unless current_user.try(:score) > 500
			flash[:error] = "Operation not permitted"
			redirect_back fallback_location: root_path
		end

		@person = Person.from_param(params[:id])
		@person.name = params[:person][:name]
		@person.description = params[:person][:description]
		@person.website = params[:person][:website]
		@person.email = params[:person][:email]
		@person.twitter = params[:person][:twitter]
		@person.goodreads = params[:person][:goodreads]
		@person.image_url = params[:person][:image_url]
		@person.wikipedia_url = params[:person][:wikipedia_url]
		@person.youtube_url = params[:person][:youtube_url]
		@person.kind = params[:person][:kind]

		if @person.save
			redirect_to person_path(@person)
		else
			flash[:error] = @person.errors.first
			redirect_back fallback_location: root_path
		end
	end

	def show
		@person = Person.from_param(params[:id])
	end

	def index
		@people = Person.order(:image_url).limit(500)
	end

	def discover
		expert = Person.discover
		if expert
		  redirect_to expert
		else
		  flash[:danger] = "No experts exist."
		  redirect_to root_path
		end
	end
end
