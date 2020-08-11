desc "This task is called by the Heroku scheduler add-on"
task :update_social_media => :environment do
  puts "Running SocialMediaUpdatesJob..."
  SocialMediaUpdatesJob.perform_now
  puts "done."
end