class Notification
	include ActiveModel::Model
	attr_accessor :msg, :headline, :image, :target, :date
end