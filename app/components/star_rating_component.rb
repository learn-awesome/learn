# frozen_string_literal: true

class StarRatingComponent < ViewComponent::Base
  def initialize(value:, count:)
    @value = value
    @count = count
  end
end
