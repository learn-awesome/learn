grouped_topics = Topic.get_hierarchy(nil)

json.nodes [grouped_topics.keys[1..-1] + grouped_topics.except(grouped_topics.keys.first).values].flatten do |topic|
  next unless topic.persisted?
  json.data do
    json.id topic.name
    json.parent topic.ancestors.first.try(:name)
  end
end

json.edges [grouped_topics.keys[1..-1] + grouped_topics.except(grouped_topics.keys.first).values].flatten do |topic|
  next unless topic.persisted?
  parent = topic.ancestors.first
  next if parent.nil?
  json.data do
    json.id (parent.name + topic.name)
    json.source parent.name
    json.target topic.name
  end
end

# {
#     "nodes": [
#       { "data": { "id": "a", "parent": "b" }, "position": { "x": 215, "y": 85 } },
#       { "data": { "id": "d" }, "position": { "x": 215, "y": 175 } }
#     ],
#     "edges": [
#       { "data": { "id": "ad", "source": "a", "target": "d" } }

#     ]
# }