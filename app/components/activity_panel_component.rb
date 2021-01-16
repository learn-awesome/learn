class ActivityPanelComponent < ViewComponent::Base
  def initialize(review:, viewer:)
    @viewer = viewer
    @review = review
    @item = Item.includes(idea_set: [people: {},topics:{},recommendations: {}], reviews: {}, links: {}).find(@review.item_id)
  end
end
