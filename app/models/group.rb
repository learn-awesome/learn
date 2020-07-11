class Group < ApplicationRecord
    has_many :group_members, dependent: :destroy, inverse_of: :group
    has_many :users, through: :group_members

    def is_admin?(user)
        self.group_members.select { |u| u.role == 'admin' and u.status == 'joined' }.include?(user)
    end

    def is_invited?(user)
        self.group_members.select { |u| u.status == 'pending' }.include?(user)
    end

    def add_member!(identifier, invited_by)
        unless identifier.present? and invited_by.present?
            raise "Please provide email address or username or ID"
        end

        if URI::MailTo::EMAIL_REGEXP =~ identifier # is it a valid email address?
            found = User.lookup_all_by_email(identifier)
            if found.size == 0
                # User does not exist. Send invitation by email
                UserMailer.with(group: self, invited_by: invited_by, email: identifier).invite_email.deliver_later
                return
            else
                # pick the first user with this email address. There could be multiple but we're ignoring the rest.
                user = found.first
            end
        elsif /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.match?(identifier) # is it a valid uuid
            user = User.where(id: identifier).first
            raise "No user found with this ID" if user.nil?
        else is_nickname? # assume it is a nickname
            found = User.where(nickname: identifier).all
            if found.size == 0
                raise "No user found with username: #{identifier}"
            elsif found.size > 1
                raise "Multiple users found with username: #{identifier}"
            else
                user = found.first
            end
        end

        if self.group_members.where(user_id: user.id).first
            raise "This user #{user.nickname} is already added to this group #{self.name}"
        end

        self.group_members.create!(user: user, role: 'normal', status: 'pending')
    end
end