desc "This task is called by the Heroku scheduler add-on"
task :points => :environment do
  puts "Calculating points..."
  User.calculate_points
  puts "done."
end
