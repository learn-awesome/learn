class CourseChanges < ActiveRecord::Migration[6.1]
  def change
    add_column :courses, :score, :integer, default: 0
    add_column :courses, :final_message, :text
    change_column_default(:courses, :cost, from: nil, to: 0)
    change_column_null :levels, :item_type_id, true
  end
end
