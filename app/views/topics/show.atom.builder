items = @topic.items.sort_by { |i| i.created_at }

atom_feed do |feed|
    feed.title("Topic: #{@topic.display_name} at LearnAwesome.org")
    feed.updated(items.first.created_at) if items.length > 0

    items.each do |item|
      feed.entry(item) do |entry|
        entry.title(item.rss_title)
        entry.content(item.rss_content, type: 'html')

        # entry.author do |author|
        #   author.name(item.author.name)
        # end
      end
    end
end