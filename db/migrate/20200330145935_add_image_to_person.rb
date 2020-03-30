class AddImageToPerson < ActiveRecord::Migration[6.0]
  def change
    add_column :people, :image_url, :string, null: true
  end
end
