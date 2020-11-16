class ItemPanelComponent < ViewComponent::Base
  def initialize(item:, user:, hide_item_type: false, hide_topics: false)
    @item = item
    @user = user
    @hide_item_type = hide_item_type
    @hide_topics = hide_topics
  end
end
