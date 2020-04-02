class TestComponent < ViewComponent::Base

  def initialize(title:)
    @title = title
  end

  private

  attr_reader :title
end