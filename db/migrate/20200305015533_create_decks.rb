class CreateDecks < ActiveRecord::Migration[6.0]
  def change
    create_table :decks, id: :uuid do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.boolean :is_public, null: false, default: false
      t.string :description
      t.string :image_url
      t.string :tags

      t.timestamps
    end

  	add_reference :flash_cards, :deck, type: :uuid, null: false
    add_foreign_key :flash_cards, :decks
    add_index :decks, [:user_id, :name], unique: true

    User.all.each do |u|
      # create a default deck for every existing user
      Deck.create(name: 'default deck', user_id: u.id)
    end
  end
end
