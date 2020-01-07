class UserMailer < ApplicationMailer

	def welcome_email
		# preview at http://localhost:3000/rails/mailers/user_mailer/welcome_email
		@user = params[:user]
		return unless @user.email.present?
		mail(to: @user.email, subject: "Welcome to learnawesome.org")
	end

	def follow_email
		# preview at http://localhost:3000/rails/mailers/user_mailer/follow_email
		@user = params[:user]
		return unless @user.email.present?
		@follower = params[:follower]
		mail(to: @user.email, subject: "#{@follower.nickname} has started following you on learnawesome.org")
	end

	def daily_email
		# preview at http://localhost:3000/rails/mailers/user_mailer/daily_email
		@user = params[:user]
		return unless @user.email.present?
		@new_followers = params[:new_followers]
		@new_fav_items = params[:new_fav_items]
		@new_global_users = params[:new_global_users]
		mail(to: @user.email, subject: "Your daily update from LearnAwesome.org")
	end
end
