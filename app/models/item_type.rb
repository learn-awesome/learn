class ItemType < ApplicationRecord
	def to_s
		self.id
	end

	def items
		Item.where(item_type: self)
	end
end