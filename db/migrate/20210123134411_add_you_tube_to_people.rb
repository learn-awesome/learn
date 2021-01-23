class AddYouTubeToPeople < ActiveRecord::Migration[6.1]
  def change
    add_column :people, :youtube_url, :string
  end
end
