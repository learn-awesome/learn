require "application_system_test_case"

class UserLevelsTest < ApplicationSystemTestCase
  setup do
    @user_level = user_levels(:one)
  end

  test "visiting the index" do
    visit user_levels_url
    assert_selector "h1", text: "User Levels"
  end

  test "creating a User level" do
    visit user_levels_url
    click_on "New User Level"

    fill_in "Answer", with: @user_level.answer
    fill_in "Course", with: @user_level.course_id
    fill_in "Feedback", with: @user_level.feedback
    fill_in "Level", with: @user_level.level_id
    fill_in "Metadata", with: @user_level.metadata
    fill_in "Status", with: @user_level.status
    fill_in "User", with: @user_level.user_id
    click_on "Create User level"

    assert_text "User level was successfully created"
    click_on "Back"
  end

  test "updating a User level" do
    visit user_levels_url
    click_on "Edit", match: :first

    fill_in "Answer", with: @user_level.answer
    fill_in "Course", with: @user_level.course_id
    fill_in "Feedback", with: @user_level.feedback
    fill_in "Level", with: @user_level.level_id
    fill_in "Metadata", with: @user_level.metadata
    fill_in "Status", with: @user_level.status
    fill_in "User", with: @user_level.user_id
    click_on "Update User level"

    assert_text "User level was successfully updated"
    click_on "Back"
  end

  test "destroying a User level" do
    visit user_levels_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "User level was successfully destroyed"
  end
end
