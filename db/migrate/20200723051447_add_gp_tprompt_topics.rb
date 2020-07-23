class AddGpTpromptTopics < ActiveRecord::Migration[6.0]
  def change
    add_column :topics, :gpt_prompt, :text, null: true
  end
end
