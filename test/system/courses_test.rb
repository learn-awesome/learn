require "application_system_test_case"

class CoursesTest < ApplicationSystemTestCase
  setup do
    @course = courses(:one)
  end

  test "visiting the index" do
    visit courses_url
    assert_selector "h1", text: "Courses"
  end

  test "creating a Course" do
    visit courses_url
    click_on "New Course"

    fill_in "Cost", with: @course.cost
    fill_in "Description", with: @course.description
    fill_in "Image url", with: @course.image_url
    fill_in "Name", with: @course.name
    fill_in "Topic", with: @course.topic_id
    fill_in "User", with: @course.user_id
    click_on "Create Course"

    assert_text "Course was successfully created"
    click_on "Back"
  end

  test "updating a Course" do
    visit courses_url
    click_on "Edit", match: :first

    fill_in "Cost", with: @course.cost
    fill_in "Description", with: @course.description
    fill_in "Image url", with: @course.image_url
    fill_in "Name", with: @course.name
    fill_in "Topic", with: @course.topic_id
    fill_in "User", with: @course.user_id
    click_on "Update Course"

    assert_text "Course was successfully updated"
    click_on "Back"
  end

  test "destroying a Course" do
    visit courses_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Course was successfully destroyed"
  end
end
