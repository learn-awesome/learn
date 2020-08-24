# == Schema Information
#
# Table name: user_vouchers
#
#  id         :uuid             not null, primary key
#  user_id    :bigint           not null
#  voucher_id :bigint           not null
#  status     :string           not null
#  expires_at :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserVoucher < ApplicationRecord
	belongs_to :user
	belongs_to :voucher
end
