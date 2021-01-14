class ItemPanelComponent < ViewComponent::Base
  def initialize(item:, user:, hide_item_type: false, hide_topics: false, is_embedded: false)
    @item = item
    @user = user
    @hide_item_type = hide_item_type
    @hide_topics = hide_topics
    @is_embedded = is_embedded
    @reviews = (Review.where("notes is not null").take(2) + Recommendation.where("notes is not null").take(2)).select { |r| r.notes.presence }
  end

  def rev_message
    @reviews.group_by(&:class).map do |k,v|
      pluralize(v.size, k == Review ? 'user' : 'expert')
    end.join(" and ")
  end
end
