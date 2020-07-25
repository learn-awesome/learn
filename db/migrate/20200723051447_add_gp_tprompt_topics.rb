class AddGpTpromptTopics < ActiveRecord::Migration[6.0]
  def change
    add_column :topics, :gpt_quiz_prompt, :text, null: true
    add_column :topics, :gpt_answer_prompt, :text, null: true
  end
end
