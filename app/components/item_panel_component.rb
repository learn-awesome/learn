class ItemPanelComponent < ViewComponent::Base
  def initialize(item:, viewer:, is_embedded: false)
    @item = item
    @viewer = viewer
    @is_embedded = is_embedded
    embedded_in_review_id = is_embedded
    @reviews = (@item.idea_set.recommendations.sort_by(&:updated_at).reverse.shuffle.take(5) +
      @item.reviews.select(&:is_ready_to_show?).reject { |rv| rv.user_id == @viewer.try(:id) }.reject { |r| r.id == embedded_in_review_id}.sort_by(&:updated_at).reverse.shuffle.take(3)).take(5)
    
    @my_review = @item.reviews.select { |rv| rv.user_id == @viewer.try(:id) }.first || Review.new(item: @item, user: @viewer)
    @tag_colors = ['red','yellow','green','blue','indigo','purple','pink']
  end

  def rev_message
    [
      pluralize(@item.idea_set.recommendations.count, 'expert'),
      pluralize(@item.reviews.select(&:is_ready_to_show?).count, 'user')
    ].reject { |m| m.start_with?("0") }.to_sentence
  end
end
