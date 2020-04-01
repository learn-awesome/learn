require 'test_helper'

class MyComponentTest < ViewComponent::TestCase
  include ViewComponent::TestHelpers

  def test_render_component
    assert_equal(
      %(<span title="my title">Hello, World!</span>),
      render_inline(TestComponent, title: "my title") { "Hello, World!" }.css("span").to_html
    )
  end
end