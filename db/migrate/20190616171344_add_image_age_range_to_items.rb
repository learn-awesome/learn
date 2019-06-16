class AddImageAgeRangeToItems < ActiveRecord::Migration[5.2]
  def change
  	add_column :items, :image_url, :string
  	add_column :items, :typical_age_range, :string
  end
end
