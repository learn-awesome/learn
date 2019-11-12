class Video
	include ActiveModel::Model
	attr_accessor :title, :duration, :thumbnail, :description

	def to_s
		self.inspect
	end
end