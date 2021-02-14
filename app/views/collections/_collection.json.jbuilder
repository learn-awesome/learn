json.extract! resource, :id, :created_at, :updated_at, :user_id, :name, :description

json.items resource.items do |item|
  json.id item.id
  json.name item.name
  json.topics item.topics
  json.format item.item_type_id
  json.level item.level
  json.top_domain item.primary_link.try(:top_domain)
  json.is_approved item.is_approved
  json.path "/items/#{item.to_param}"
  json.display_name item.display_name
  json.topic_names item.topics.map(&:name).join(",")
end
