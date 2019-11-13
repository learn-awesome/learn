# == Schema Information
#
# Table name: links
#
#  id         :uuid             not null, primary key
#  url        :string           not null
#  item_id    :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class LinkTest < ActiveSupport::TestCase
	test "topdomain" do
		assert_equal links(:google_link).top_domain, "google.com"
	end
end
