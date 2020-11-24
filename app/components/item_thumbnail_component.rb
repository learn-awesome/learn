class ItemThumbnailComponent < ViewComponent::Base
  def initialize(item:)
    @item = item
  end

  def render?
    @item.image_url
  end
end
