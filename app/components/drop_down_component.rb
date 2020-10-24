class DropDownComponent < ViewComponent::Base
  def initialize(label:, items:)
    @label = label
    @items = items
  end
end
