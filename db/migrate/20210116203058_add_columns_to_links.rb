class AddColumnsToLinks < ActiveRecord::Migration[6.1]
  def change
    add_column :links, :embed_tag, :string
    add_column :links, :mimetype, :string
    add_column :links, :has_paywall, :boolean
    add_column :links, :has_loginwall, :boolean
    add_column :links, :has_ads, :boolean
  end
end
