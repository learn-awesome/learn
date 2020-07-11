class GroupMember < ApplicationRecord
	belongs_to :group, inverse_of: :group_members
	belongs_to :user, inverse_of: :group_members
	validates :group, presence: true
    validates :user, presence: true
    
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