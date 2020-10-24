class ActivityPanelComponent < ViewComponent::Base
  def initialize(user:)
    @user = user
  end
end
