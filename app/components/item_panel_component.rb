class ItemPanelComponent < ViewComponent::Base
  def initialize(item:, user:, is_embedded: false)
    @item = item
    @user = user
    @is_embedded = is_embedded
    @reviews = (@item.reviews.where("notes is not null").take(2) + @item.idea_set.recommendations.where("notes is not null").take(2)).select { |r| r.notes.presence }
  end

  def rev_message
    @reviews.group_by(&:class).map do |k,v|
      pluralize(v.size, k == Review ? 'user' : 'expert')
    end.join(" and ")
  end
end
