# Run this with rails sitemap:refresh:no_pin
# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "https://learnawesome.org"
SitemapGenerator::Sitemap.compress = Rails.env.production?

SitemapGenerator::Sitemap.create do
  # Put links creation logic here.
  #
  # The root path '/' and sitemap index file are added automatically for you.
  # Links are added to the Sitemap in the order they are specified.
  #
  # Usage: add(path, options={})
  #        (default options are used if you don't specify)
  #
  # Defaults: :priority => 0.5, :changefreq => 'weekly',
  #           :lastmod => Time.now, :host => default_host
  #
  # Examples:
  #
  # Add '/articles'
  #
  #   add articles_path, :priority => 0.7, :changefreq => 'daily'
  #
  # Add all articles:
  #
  #   Article.find_each do |article|
  #     add article_path(article), :lastmod => article.updated_at
  #   end

  add topics_path, changefreq: 'daily'
  add item_types_path, changefreq: 'daily'

  Topic.find_each do |topic|
    add topic_path(topic), changefreq: 'daily'
  end

  Item.find_each do |item|
    add item_path(item), changefreq: 'weekly'
  end

  ItemType.find_each do |item_type|
    add item_type_path(item_type), changefreq: 'daily'
  end

  Person.find_each do |person|
    add person_path(person), changefreq: 'weekly'
  end

  User.find_each do |user|
    add user_path(user), changefreq: 'weekly'
  end
end
