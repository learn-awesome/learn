class ItemsGridComponent < ViewComponent::Base
  def initialize(items:, user:)
    @items = items
    @user = user
  end
end
