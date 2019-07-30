class ExampleJob < ApplicationJob
  queue_as :default

  def perform(*args)
    puts "Example job running"
  end
end
