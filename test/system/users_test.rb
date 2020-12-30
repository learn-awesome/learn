require "application_system_test_case"

class UsersTest < ApplicationSystemTestCase
  test "browse users" do
    visit users_url
  
    # assert_selector "h1", text: "Users"
  end

  test "about page" do
    visit about_url
  end
end
