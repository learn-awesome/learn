# == Schema Information
#
# Table name: courses
#
#  id          :uuid             not null, primary key
#  name        :string           not null
#  description :text
#  image_url   :string
#  topic_id    :uuid             not null
#  user_id     :uuid             not null
#  cost        :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  score       :integer          default(0)
#
class Course < ApplicationRecord
  belongs_to :topic
  belongs_to :user # TODO: allow multiple curators
  has_many :levels, -> { order(seq: :asc) }, dependent: :destroy
  has_many :user_levels, dependent: :destroy

  validates :description, length: { maximum: 500 }
  validates :name, presence: true, length: { minimum: 8, maximum: 100 }
  validates :image_url, presence: true

  after_create :create_first_level

  def self.listed_courses(user)
    if user
      Course.where('score > 0').or(Course.where(user_id: user.id)).order('score DESC')
    else
      Course.where('score > 0').order('score DESC')
    end
  end

  def taught_by?(user)
    self.user_id == user.id
  end

  def is_featured?
    self.score > 0
  end

  def create_first_level
    self.levels.create!(seq: 1, name: 'first level', answer_type: 'text', answer_prompt: 'to complete this level, tell us why you want to learn this?')
  end

  def first_level
    levels.where(seq: 1).first
  end

  def nth_level(n)
    levels.order('seq ASC')[n - 1]
  end

  def to_param
    self.id.to_s.split("-").first + "-" + self.name.to_s.parameterize + "-" + "by" + "-" + self.user.nickname.parameterize
  end

	def self.from_param(slug)
	  id_prefix = slug.split("-").first
    self.where("courses.id::varchar LIKE '#{id_prefix}-%'").first
	end

  def count_students
    self.user_levels.distinct.count(:user_id)
  end

  def enroll!(user)
    return false, "A user is required" if user.nil? || self.user.nil?
    return false, "Owner cannot enroll" if self.user == user
    ul = UserLevel.create(user: user, course: self, level: first_level, status: 'pending')
    return ul.persisted?, ul.errors
  end

  def current_user_level(user)
    UserLevel.where(user: user, course: self).all.sort_by { |ul| ul.level.seq }.last
  end

  def next_user_level(user)
    current_user_level = self.current_user_level(user)
    new_level = self.levels[self.levels.index(current_user_level.level)+1]
    UserLevel.new(course: self, level: new_level, user: user, status: 'pending') if new_level
  end

  def get_student_levels(level_idx)
    level = nth_level(level_idx)
    UserLevel.where(level: level).where("status != 'ACCEPTED'").all.group_by(&:status)
  end
end
