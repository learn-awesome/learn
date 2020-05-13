class CreateNewItemTypes < ActiveRecord::Migration[6.0]
  def up
    ItemType.create(id: 'project', display_name_plural: "Projects")
    ItemType.create(id: 'webmeet', display_name_plural: "Online Meetups")
    ItemType.create(id: 'webconf', display_name_plural: "Online Conferences")
  end

  def down
    ItemType.find('project').destroy
    ItemType.find('webmeet').destroy
    ItemType.find('webconf').destroy
  end
end
