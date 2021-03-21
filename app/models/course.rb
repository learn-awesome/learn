class Course < ApplicationRecord
  belongs_to :topic
  belongs_to :user # TODO: allow multiple curators
  has_many :levels

  def first_level
    levels.where(seq: 1).first
  end

  def enroll!(user)
    ul = UserLevel.create(user: user, course: self, level: first_level, status: 'pending')
    return ul.persisted?, ul.errors
  end

  def current_user_level(user)
    UserLevel.where(user: user, course: self).all.sort_by { |ul| ul.level.seq }.last
  end
end
