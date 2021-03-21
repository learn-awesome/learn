class UserLevel < ApplicationRecord
  belongs_to :user
  belongs_to :course
  belongs_to :level
end
