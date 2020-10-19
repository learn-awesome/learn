class ResetAllTopicCacheCounters < ActiveRecord::Migration[6.0]
  def up
    Topic.all.each do |topic|
      Topic.reset_counters(topic.id, :user_topics)
    end
  end
end
