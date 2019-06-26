class UserUserRelation < ApplicationRecord
  belongs_to :from_user, foreign_key: "from_user_id", class_name: "User"
  belongs_to :to_user, foreign_key: "to_user_id", class_name: "User"
end
