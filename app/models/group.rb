require 'digest'

class Group < ApplicationRecord
    has_many :group_members, dependent: :destroy, inverse_of: :group
    has_many :users, through: :group_members

    def admins
        self.group_members.select { |gm| gm.role == 'admin' and gm.status == 'confirmed' }.map(&:user)
    end

    def is_admin?(user)
        self.admins.include?(user)
    end

    def is_invited?(user)
        self.group_members.select { |gm| gm.status == 'pending' }.map(&:user).include?(user)
    end

    def add_member!(identifier, invited_by)
        unless identifier.present? and invited_by.present?
            return false, "Please provide email address or username or ID"
        end

        if URI::MailTo::EMAIL_REGEXP =~ identifier # is it a valid email address?
            found = User.lookup_all_by_email(identifier)
            if found.size == 0
                # User does not exist. Send invitation by email
                UserMailer.with(group: self, invited_by: invited_by, email: identifier).invite_email.deliver_later
                return true, "Invitation has been sent to #{identifier}"
            else
                # pick the first user with this email address. There could be multiple but we're ignoring the rest.
                user = found.first
            end
        elsif /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.match?(identifier) # is it a valid uuid
            user = User.where(id: identifier).first
            return false, "No user found with this ID" if user.nil?
        else # assume it is a nickname
            found = User.where(nickname: identifier).all
            if found.size == 0
                return false, "No user found with username: #{identifier}"
            elsif found.size > 1
                return false, "Multiple users found with username: #{identifier}"
            else
                user = found.first
            end
        end

        if self.group_members.where(user_id: user.id).first
            return false, "This user #{user.nickname} is already added to this group #{self.name}"
        end

        self.group_members.create!(user: user, role: 'normal', status: 'pending')
        UserMailer.with(user: user, group: self, invited_by: invited_by, recipient_email: identifier).invite_email.deliver_later if user.email.present?
        return true, "Invitation sent to #{user.nickname}"
    end

    def accept_invite!(user, invite_code = nil)
        if self.is_invited?(user)
            gm = self.group_members.select { |gm| gm.status == 'pending' and gm.user == user }.first
            gm.status = 'confirmed'
            if gm.save
                return true, "Invite accepted"
            else
                return false, "Error: #{gm.errors.first}"
            end
        elsif invite_code == self.invite_code
            self.group_members.create!(user: user, role: 'normal', status: 'confirmed')
            return true, "Invite accepted"
        else
            return false, "Invalid invitation"
        end
    end

    def invite_code
        Digest::SHA256.hexdigest(self.id + ENV['RAILS_MASTER_KEY'].to_s)[0..20]
    end
end