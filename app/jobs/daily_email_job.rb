class DailyEmailJob < ApplicationJob
  queue_as :default

  def perform(*args)
    User.order("created_at ASC").in_groups_of(50).each_with_index do |group, index|
      DailyEmailBatchJob.set(wait: (index+1).minutes).perform_later(index)
    end
    puts "Scheduled all batches"
  end
end
