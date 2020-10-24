class ItemPanelComponent < ViewComponent::Base
  def initialize(item:, user:)
    @item = item
    @user = user
  end
end
