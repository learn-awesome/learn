base_url = "https://#{request.host_with_port}"

xml.instruct! :xml, :version=>"1.0"
xml.tag! 'urlset', 'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xmlns:image' => 'http://www.google.com/schemas/sitemap-image/1.1', 'xmlns:video' => 'http://www.google.com/schemas/sitemap-video/1.1' do
  xml.url do
    xml.loc base_url + '/'
  end
  xml.url do
    xml.loc base_url + '/about'
  end
  xml.url do
    xml.loc base_url + '/topics'
  end
  xml.url do
    xml.loc base_url + '/formats'
  end
  xml.url do
    xml.loc base_url + '/users'
  end
  xml.url do
    xml.loc base_url + '/people'
  end
  xml.url do
    xml.loc base_url + '/programs'
  end

  Topic.find_each do |topic|
    xml.url do
        xml.loc base_url + topic_path(topic)
      end
  end

  Item.find_each do |item|
    xml.url do
        xml.loc base_url + item_path(item)
      end
  end

  ItemType.find_each do |item_type|
    xml.url do
        xml.loc base_url + item_type_path(item_type)
      end
  end

  Person.find_each do |person|
    xml.url do
        xml.loc base_url + person_path(person)
      end
  end

  User.find_each do |user|
    xml.url do
        xml.loc base_url + user_path(user)
      end
  end
end