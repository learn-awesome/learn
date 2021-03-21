json.extract! course, :id, :name, :description, :image_url, :topic_id, :user_id, :cost, :created_at, :updated_at
json.url course_url(course, format: :json)
