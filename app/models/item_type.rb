class ItemType < ApplicationRecord
	def to_s
		self.id
	end
end