# == Schema Information
#
# Table name: group_members
#
#  id         :uuid             not null, primary key
#  group_id   :uuid             not null
#  user_id    :uuid             not null
#  role       :string           not null
#  status     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class GroupMember < ApplicationRecord
	belongs_to :group, inverse_of: :group_members
	belongs_to :user, inverse_of: :group_members
	validates :group, presence: true
    validates :user, presence: true
    validates :user_id, uniqueness: { scope: :group_id }
    
    def is_admin?
        self.role == 'admin'
    end

    def is_confirmed?
        self.status == 'confirmed'
    end

    def is_invited?
        self.status == 'pending'
    end
end
