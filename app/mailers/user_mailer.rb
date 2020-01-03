class UserMailer < ApplicationMailer

	def welcome_email
		@user = params[:user]
		return unless @user.email.present?
		mail(to: @user.email, subject: "Welcome to learnawesome.org")
	end

	def follow_email
		@user = params[:user]
		return unless @user.email.present?
		@follower = params[:follower]
		mail(to: @user.email, subject: "#{@follower.nickname} has started following you on learnawesome.org")
	end

	def daily_email(user, new_followers, new_fav_items)
		return unless user.email.present?
		@new_followers = new_followers
		@new_fav_items = new_fav_items
		mail(to: user.email, subject: "Your daily update from LearnAwesome.org")
	end
end
