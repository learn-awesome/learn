class ActivityPanelComponent < ViewComponent::Base
  def initialize(review:, viewer:)
    @viewer = viewer
    @review = review
    @item = @review.item
  end
end
