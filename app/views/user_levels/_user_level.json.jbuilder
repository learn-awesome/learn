json.extract! user_level, :id, :user_id, :course_id, :level_id, :answer, :status, :feedback, :metadata, :created_at, :updated_at
json.url user_level_url(user_level, format: :json)
