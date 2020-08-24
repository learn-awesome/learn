# == Schema Information
#
# Table name: user_user_relations
#
#  id           :uuid             not null, primary key
#  from_user_id :uuid             not null
#  to_user_id   :uuid             not null
#  action       :string           default("follow"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class UserUserRelation < ApplicationRecord
  belongs_to :from_user, foreign_key: "from_user_id", class_name: "User"
  belongs_to :to_user, foreign_key: "to_user_id", class_name: "User"
end
