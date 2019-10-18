require 'test_helper'
require "action_view/component/test_helpers"

class MyComponentTest < ActiveSupport::TestCase
  include ActionView::Component::TestHelpers

  def test_render_component
    assert_equal(
      %(<span title="my title">Hello, World!</span>),
      render_inline(TestComponent, title: "my title") { "Hello, World!" }.css("span").to_html
    )
  end
end