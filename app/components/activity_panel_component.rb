class ActivityPanelComponent < ViewComponent::Base
  def initialize(review:, user:)
    @user = user
    @review = review
  end
end
