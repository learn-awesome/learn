# == Schema Information
#
# Table name: vouchers
#
#  id                   :uuid             not null, primary key
#  code                 :string           not null
#  max_limit            :integer
#  payment_ref          :string
#  domain               :string
#  price                :integer
#  period_days          :integer
#  internal_description :string
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

class Voucher < ApplicationRecord
	validates_length_of :code, in: 8..32, allow_blank: false
	validates :status, presence: true
	
	has_many :user_vouchers, dependent: :destroy, inverse_of: :user
	has_many :users, through: :user_vouchers
end
