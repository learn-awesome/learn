require "test_helper"

class UserLevelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user_level = user_levels(:one)
  end

  test "should get index" do
    get user_levels_url
    assert_response :success
  end

  test "should get new" do
    get new_user_level_url
    assert_response :success
  end

  test "should create user_level" do
    assert_difference('UserLevel.count') do
      post user_levels_url, params: { user_level: { answer: @user_level.answer, course_id: @user_level.course_id, feedback: @user_level.feedback, level_id: @user_level.level_id, metadata: @user_level.metadata, status: @user_level.status, user_id: @user_level.user_id } }
    end

    assert_redirected_to user_level_url(UserLevel.last)
  end

  test "should show user_level" do
    get user_level_url(@user_level)
    assert_response :success
  end

  test "should get edit" do
    get edit_user_level_url(@user_level)
    assert_response :success
  end

  test "should update user_level" do
    patch user_level_url(@user_level), params: { user_level: { answer: @user_level.answer, course_id: @user_level.course_id, feedback: @user_level.feedback, level_id: @user_level.level_id, metadata: @user_level.metadata, status: @user_level.status, user_id: @user_level.user_id } }
    assert_redirected_to user_level_url(@user_level)
  end

  test "should destroy user_level" do
    assert_difference('UserLevel.count', -1) do
      delete user_level_url(@user_level)
    end

    assert_redirected_to user_levels_url
  end
end
