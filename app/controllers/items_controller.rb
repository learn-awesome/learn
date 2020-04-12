class ItemsController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update, :combine, :destroy]
  before_action :set_layout, :only => [:new, :show]
  before_action :set_has_used_browser_extension

  def index
  end

  def show

  	@item = Item.from_param(params[:id])
    if @item.nil?
      flash[:danger] = "We couldn't find this thing."
      redirect_to root_path and return
    end
    @my_review = Review.where(item: @item, user: current_user).first || Review.new
    if current_user
      @lists_added = CollectionItem.where(item: @item).where(collection_id: current_user.collections.pluck(:id)).pluck(:collection_id)
    end
    @open_status_menu = (params[:open_status_menu].to_s == 'true')
  end

  def new
    @item_name = params[:name]
    @item_url = params[:url].to_s
    @topics = (params[:topic].present? ? [Topic.find(params[:topic])] : [])
    @syllabus = (params[:syllabus].to_s == 'true')

    @extracted = nil # Item.extract_opengraph_data(@item_url) if @item_url.present? 

    if @extracted.present?
      @item_type = @extracted[:item_type]
      @item_url = @extracted[:canonical] || @item_url
      @item_name = @extracted[:title] || @item_name
      @image_url = @extracted[:image_url]
      @creators = @extracted[:creators]
      @topics += @extracted[:topics]
      if @creators.present?
        creator = Person.where(goodreads: @creators.first).first_or_create do |p|
          p.name = @creators.first.split(".").last.gsub("_", " ")
          p.description = @extracted[:creator_bio]
        end
        @creator_id = creator.id
      end
      @description = @extracted[:description]
      @metadata = @extracted[:metadata].to_json
    else
      @item_type = Item.suggest_format(@item_url) if @item_url.present?
    end

  end

  def new_syllabus
    @syllabus = true
    @topics = (params[:topic].present? ? [Topic.find(params[:topic])] : [])
  end

  def syllabus_editor
    @syllabus = true
    @topics = (params[:topic].present? ? [Topic.find(params[:topic])] : [])
    render 'syllabus_editor', layout: false
  end

  def create
    @syllabus = (params[:syllabus].to_s == 'true')
    item = nil
    @extracted = Item.extract_opengraph_data(params[:item][:url]) if params[:item][:url].present? 
    Item.transaction do
      idea_set = IdeaSet.new
      idea_set.name = params[:item][:name] || @extracted[:title] || params[:item][:url]
      idea_set.description = params[:item][:description]

      if params[:item][:person_id].present?
        idea_set.person_idea_sets.build
        idea_set.person_idea_sets.first.role = params[:item][:role]
        idea_set.person_idea_sets.first.person_id = params[:item][:person_id]
      end

      unless idea_set.save
        raise idea_set.errors.first.inspect
      end

      params[:item][:topics].each do |topic_id|
        TopicIdeaSet.create(topic_id: topic_id, idea_set: idea_set)
      end

      params[:item][:topic_names].to_a.each do |topic_name|
        topic = Topic.where(name: topic_name).first
        next unless topic
        TopicIdeaSet.find_or_create_by(topic_id: topic.id, idea_set: idea_set)
      end

      item = Item.new(item_params)
      # item.search_index = params[:item][:name]
      item.name = idea_set.name
      item.user = current_user
      item.idea_set = idea_set

      if !@syllabus
        item.links.build
        item.links.first.url = params[:item][:url] # why not @extracted[:canonical] ?
        if params[:item][:second_url].present?
          item.links.build
          item.links.last.url = params[:item][:second_url]
        end
      end

      unless params[:item][:status].blank?
        item.reviews.build(
          user: current_user,
          status: params[:item][:status],
          inspirational_score: params[:item][:inspirational_score],
          educational_score: params[:item][:educational_score],
          challenging_score: params[:item][:challenging_score],
          entertaining_score: params[:item][:entertaining_score],
          visual_score: params[:item][:visual_score],
          interactive_score: params[:item][:interactive_score],
          notes: params[:item][:notes]
        )
      end

      unless item.save
        raise item.errors.first.inspect
      end
    end
    if item
  	  redirect_to item
    else
      redirect_back fallback_location: root_path
    end
  end

  def add_related_items
    self.idea_set.items << items.select(&:valid?)
  end

  def combine
    @item = Item.from_param(params[:id])
    if request.post?
      unless current_user.can_combine_items?
        flash[:danger] = "Not authorized"
        redirect_back(fallback_location: root_path) and return
      end
      
      other_item_id = params[:item][:other_item_id].to_s.scan(/items\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/).first&.first
      if other_item_id.blank? or Item.where(id: other_item_id).first.nil?
        flash[:danger] = "Item not found"
        redirect_back(fallback_location: root_path) and return
      end

      @other_item = Item.find(other_item_id)
      
      unless (msg = @item.combine(@other_item))
        flash[:success] = "Successfully merged"
        redirect_to item_path(@item)
      else
        flash[:danger] = msg
        redirect_back fallback_location: root_path
      end
    end
  end

  def edit
    @item = Item.from_param(params[:id])
  end

  def update
    item = Item.find_by(id: params[:id])
    if item.can_user_edit?(current_user) == false
      flash[:danger] = "Only the original user can update a learning plan."
      redirect_to item_path(@item)
    end

    if item
      item.name = params[:name]
      item.item_type_id = params[:item_type_id] if ItemType.find(params[:item_type_id])
      item.estimated_time = params[:estimated_time]
      item.time_unit = params[:estimated_time_unit]
      item.typical_age_range = params[:typical_age_range]
      item.year = params[:year]
      item.description = params[:description].try(:strip)
      item.image_url = params[:image_url]
      item.idea_set.topic_ids = params[:topics]
      if item.item_type_id != 'learning_plan' && item.links.present?
        item.links.where.not(id: params[:links].values.map {|link| link['id'] }).destroy_all

        params[:links].each do |key, link_params|
          link = item.links.find_by(id: link_params[:id])
          next if link_params[:url].blank?
          if link
            link.update(url: link_params[:url])
          else
            item.links.create(url: link_params[:url])
          end
        end
      end

      params[:person_ids].to_a.reject(&:blank?).each do |x|
        unless item.authors.map(&:id).include?(x)
          item.idea_set.person_idea_sets.create!(person_id: x, role: "creator")
        end
      end

      item.authors.each do |a|
        unless params[:person_ids].to_a.reject(&:blank?).include?(a.id)
          PersonIdeaSet.where(idea_set: item.idea_set, person: a, role: "creator").first.try(:destroy)
        end
      end

      if item.save
        render json: {stats: 'ok'}
      else
        render json: {status: 'error', message: item.errors}
      end
    else
      render json: {status: 'error', message: 'Item not found'}
    end
  end

  def search
    # search or add
    @q = params[:q]
    is_ext = params[:ext].to_s == 'true'

  	if @q.present?
  		@items = Item.search(@q, 10, is_fuzzy=true).to_a
      if @q.start_with?("http://") or @q.start_with?("https://")
        # query is a URL, no point editing. Directly take to new
        if @items.first
          redirect_to @items.first and return
          redirect_to item_path(id: @items.first, ext: is_ext)
        else
          canonical = Item.extract_canonical_url(@q)
          if !canonical.blank? and canonical != @q
            @items = Item.search(canonical, 10, is_fuzzy=false).to_a
            if @items.first
              redirect_to @items.first and return
              redirect_to item_path(id: @items.first, ext: is_ext)
            else
              if current_user
                redirect_to new_item_path(url: canonical, ext: is_ext) and return
              else
                flash[:danger] = "You need to log in to add links."
                redirect_to root_path
              end
            end
          else
            if current_user
              redirect_to new_item_path(url: @q, ext: is_ext) and return
            else
              flash[:danger] = "You need to log in to add links."
              redirect_to root_path
            end
          end
        end
      end
      respond_to do |format|
        format.html
        format.json { render json: @items }
      end
  	end
    # render search form
  end

  def destroy
    if current_user.is_core_dev?
      @item = Item.from_param(params[:id])
      @item.idea_set.destroy!
      flash[:success] = "Item deleted"
      redirect_to root_path
    else
      flash[:error] = "Operation not permitted"
      redirect_to :back
    end
  end

  def discover
    if current_user
      if current_user.random_fav_topic
        fav_topics = current_user.user_topics.map(&:topic)
      else
        fav_topics = nil
      end
      item = Item.discover(fav_topics, current_user.random_fav_item_types.to_s.split(","))
    else
      item = Item.discover
    end
    if item
      redirect_to item
    else
      flash[:danger] = "No items exist."
      redirect_to root_path
    end
  end

  def query
    @topic_name = params[:topic]
    @item_type = params[:item_type]
    @length = params[:length]
    @quality = params[:quality]
    if params[:commit].present?
      # query items
      @items = Item.advanced_search(@topic_name, @item_type, @length, @quality)
    else
      @items = []
    end
  end

  private

    def set_layout
      self.class.layout ( params['ext'].to_s == 'true' ? "embed_#{request.variant.first}" :  request.variant.first.to_s)
    end

    def item_params
      params.require(:item).permit(:name, :item_type_id, :estimated_time, :year, :time_unit, :typical_age_range, :image_url, :description, :metadata)
    end

    def set_has_used_browser_extension
      if current_user and params[:ext].to_s == 'true' and !current_user.has_used_browser_extension
        current_user.has_used_browser_extension = true
        current_user.save
      end
    end
end
