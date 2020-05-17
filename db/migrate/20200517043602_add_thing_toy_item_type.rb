class AddThingToyItemType < ActiveRecord::Migration[6.0]
  def up
    ItemType.create(id: 'thing', display_name_plural: "Things and Toys")
  end

  def down
    ItemType.find('thing').destroy
  end
end
