class ChangeAgeRangeToLevel < ActiveRecord::Migration[6.0]
  def up
    rename_column :items, :typical_age_range, :level
    Item.all.update_all(level: nil)
  end

  def down
    rename_column :items, :level, :typical_age_range
    Item.all.update_all(typical_age_range: nil)
  end
end
