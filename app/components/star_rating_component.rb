# frozen_string_literal: true

class StarRatingComponent < ViewComponent::Base
  def initialize(item:)
    @item = item
  end
end
