# == Schema Information
#
# Table name: item_types
#
#  id                  :string           not null, primary key
#  display_name_plural :string
#

class ItemType < ApplicationRecord
	def to_s
		self.id
	end

	def items
		Item.where(item_type: self)
	end

	def self.button_style
		"btn-soft-info"
	end

	def icon
		"/icons/#{id}.svg"
	end
end
