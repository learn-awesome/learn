items = @topic.items.sort_by { |i| i.created_at }.reverse.take(20)

xml.instruct! :xml, version: '1.0'
xml.rss version: '2.0' do
  xml.channel do
    xml.title "Topic: #{@topic.display_name} at LearnAwesome.org"
    # xml.description 'Books List'
    xml.link topic_url(@topic, format: :rss)
 
    items.each do |item|
      xml.item do
        xml.title item.rss_title
        xml.description item.rss_content
        xml.pubDate item.created_at
        xml.guid item.id
        xml.link item_url(item)

        # xml.tag!("dc:creator", item.author_name) if item_has_creator?(item)
      end
    end
  end
end