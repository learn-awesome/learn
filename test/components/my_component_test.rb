require "view_component/test_case"

class MyComponentTest < ViewComponent::TestCase
  def test_render_component
    assert_equal(
      %(<span class="h-60 md:h-96">my title</span>),
      render_inline(TestComponent.new(title: "my title")) { "Hello, World!" }.css("span").to_html
    )
  end
end