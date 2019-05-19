require 'test_helper'

class DashboardControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get dashboard_show_url
    assert_response :success
  end

end
