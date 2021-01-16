class ItemPanelComponent < ViewComponent::Base
  def initialize(item:, viewer:, is_embedded: false)
    @item = item
    @viewer = viewer
    @is_embedded = is_embedded
    embedded_in_review_id = is_embedded
    @reviews = (@item.idea_set.recommendations.sort_by(&:updated_at).reverse.take(3) +
      @item.reviews.select(&:is_ready_to_show?).reject { |r| r.id == embedded_in_review_id}.sort_by(&:updated_at).reverse.take(3)).take(4)
    
    @my_review = @item.reviews.select { |rv| rv.user_id == @viewer.try(:id) }.first || Review.new(item: @item, user: @viewer)
    @tag_colors = ['red','yellow','green','blue','indigo','purple','pink']
  end

  def rev_message
    @reviews.group_by(&:class).map do |k,v|
      pluralize(v.size, k == Review ? 'user' : 'expert')
    end.join(" and ")
  end
end
