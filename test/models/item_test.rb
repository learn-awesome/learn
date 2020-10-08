# == Schema Information
#
# Table name: items
#
#  id                    :uuid             not null, primary key
#  name                  :string           not null
#  item_type_id          :string           not null
#  estimated_time        :integer
#  time_unit             :string           default("minutes"), not null
#  required_expertise    :integer
#  idea_set_id           :uuid             not null
#  user_id               :uuid             not null
#  year                  :integer
#  image_url             :string
#  inspirational_score   :decimal(3, 2)
#  educational_score     :decimal(3, 2)
#  challenging_score     :decimal(3, 2)
#  entertaining_score    :decimal(3, 2)
#  visual_score          :decimal(3, 2)
#  interactive_score     :decimal(3, 2)
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  typical_age_range     :string
#  description           :text
#  metadata              :json             not null
#  page_count            :integer
#  goodreads_rating      :decimal(3, 2)
#  amazon_rating         :decimal(3, 2)
#  isbn                  :string
#  isbn13                :string
#  cost                  :decimal(8, 2)
#  language              :string
#  overall_score         :decimal(3, 2)
#  protected_description :text
#

require 'test_helper'

class ItemTest < ActiveSupport::TestCase
  test "search" do
    assert_equal Item.search("firstitem").count, 1
  end

  test "advanced search" do
    assert_equal Item.advanced_search(nil,nil,nil,nil).count, Item.all.count
  end

  test "extract opengraph data" do
    url = "https://www.youtube.com/watch?v=oGab38pKscw"
    response_body = File.read(fixture_file("youtube_oGab38pKscw.html"))
    stub_request(:get, url).to_return(status: 200, body: response_body)

    result = Item.extract_opengraph_data(url)

    assert_equal("video", result[:item_type])
    assert_equal([], result[:topics])
    assert_equal("https://www.youtube.com/watch?v=oGab38pKscw", result[:canonical])
    assert_equal("https://i.ytimg.com/vi/oGab38pKscw/maxresdefault.jpg", result[:image_url])
    assert_equal("The High Price of Materialism", result[:title])
    assert(result[:description])
  end

  test "Downloading Open Graph data handles request throttled responses" do
    url = "https://www.youtube.com/watch?v=oGab38pKscw"
    stub_request(:get, url).to_return(status: 429)

    result = Item.extract_opengraph_data(url)

    assert_equal({}, result, "Return an empty Hash when requests are throttled")
  end

  def fixture_file(filename)
    Rails.root.join("test", "fixtures", "files", filename)
  end
end
