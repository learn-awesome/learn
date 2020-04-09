# == Schema Information
#
# Table name: vouchers
#
#  id                   :uuid             not null, primary key
#  user_id              :bigint           not null
#  code                 :string           not null
#  max_limit            :integer
#  payment_ref          :string
#  domain               :string
#  price                :integer
#  period_days          :integer
#  internal_description :string
#  status               :string           not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
# Indexes
#
#  index_vouchers_on_user_id  (user_id)
#

class Voucher < ApplicationRecord
	validates_length_of :code, in: 8..32, allow_blank: false
	validates :status, presence: true
	
	has_many :user_vouchers, dependent: :destroy, inverse_of: :user
	has_many :users, through: :user_vouchers
end
