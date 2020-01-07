desc "Send daily email to all users"
task :points => :environment do
  puts "Sending daily email"
  DailyEmailJob.perform_now
  puts "done."
end
