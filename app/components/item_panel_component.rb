class ItemPanelComponent < ViewComponent::Base
  def initialize(item:, viewer:, is_embedded: false)
    @item = item
    @viewer = viewer
    @is_embedded = is_embedded
    embedded_in_review_id = is_embedded
    @reviews = @item.reviews.select(&:notes).reject { |r| r.id == embedded_in_review_id}.take(2) + 
      @item.idea_set.recommendations.select(&:notes).take(2)
    
    @my_review = @item.reviews.select { |rv| rv.user_id == @viewer.id }.first || Review.new(item: @item, user: @viewer)
  end

  def rev_message
    @reviews.group_by(&:class).map do |k,v|
      pluralize(v.size, k == Review ? 'user' : 'expert')
    end.join(" and ")
  end
end
