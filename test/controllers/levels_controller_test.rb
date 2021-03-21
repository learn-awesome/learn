require "test_helper"

class LevelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @level = levels(:one)
  end

  test "should get index" do
    get levels_url
    assert_response :success
  end

  test "should get new" do
    get new_level_url
    assert_response :success
  end

  test "should create level" do
    assert_difference('Level.count') do
      post levels_url, params: { level: { answer_prompt: @level.answer_prompt, answer_type: @level.answer_type, course_id: @level.course_id, description: @level.description, item_type_id: @level.item_type_id, link: @level.link, name: @level.name, seq: @level.seq } }
    end

    assert_redirected_to level_url(Level.last)
  end

  test "should show level" do
    get level_url(@level)
    assert_response :success
  end

  test "should get edit" do
    get edit_level_url(@level)
    assert_response :success
  end

  test "should update level" do
    patch level_url(@level), params: { level: { answer_prompt: @level.answer_prompt, answer_type: @level.answer_type, course_id: @level.course_id, description: @level.description, item_type_id: @level.item_type_id, link: @level.link, name: @level.name, seq: @level.seq } }
    assert_redirected_to level_url(@level)
  end

  test "should destroy level" do
    assert_difference('Level.count', -1) do
      delete level_url(@level)
    end

    assert_redirected_to levels_url
  end
end
