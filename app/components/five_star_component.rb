class FiveStarComponent < ViewComponent::Base
  def initialize(review:)
    @review = review
  end
end