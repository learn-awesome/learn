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
		@new_items = params[:new_items]
		mail(to: @user.email, subject: "Updates from LearnAwesome.org")
	end

	def invite_email
		# preview at http://localhost:3000/rails/mailers/user_mailer/invite_email
		@group = params[:group]
		@invited_by = params[:invited_by]

		@recipient_email = params[:recipient_email]
		@user = params[:invited_user]

		@group_reviews = @group.users.map { |u| u. reviews.recent.take(3) }.compact.flatten if @group

		if @group
			subject = "#{@invited_by.nickname} has invited you to join the group #{@group.name} on LearnAwesome.org"
		else
			"#{@invited_by.nickname} has invited you to join LearnAwesome.org"
		end

		if @user
			mail(to: @user.email, subject: subject)
		else
			mail(to: @recipient_email, subject: subject)
		end
	end
end
