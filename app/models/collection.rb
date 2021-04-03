# == Schema Information
#
# Table name: collections
#
#  id          :uuid             not null, primary key
#  name        :string           not null
#  user_id     :uuid             not null
#  is_public   :boolean          default(FALSE), not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Collection < ApplicationRecord
  belongs_to :user, inverse_of: :collections
  has_many :collection_items, dependent: :destroy
  has_many :items, through: :collection_items
  validates :name, presence: true, length: { in: 3..350 }

  attr_accessor :goodreads_list_url
  attr_accessor :item_id

  def topics
    self.items.map(&:topics).flatten.map(&:name).uniq.sort
  end

  def formats
    self.items.map(&:item_type_id).uniq.sort
  end

  def levels
    self.items.map(&:level).uniq.sort
  end
end
