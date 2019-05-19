class TopicRelation < ApplicationRecord
  belongs_to :from, class_name: "Topic"
  belongs_to :to, class_name: "Topic"
  validates :from, presence: true
  validates :to, presence: true
  validates :kind, presence: true
end
