desc "Send daily email to all users"
task :dailyemail => :environment do
  puts "Sending daily email"
  DailyEmailJob.perform_now
  puts "done."
end
