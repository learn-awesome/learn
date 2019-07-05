class DropTopicsNamespace < ActiveRecord::Migration[5.2]
  def up
  	Topic.where("name != search_index").update_all("name = search_index")

  	remove_column :topics, :namespace
  end

  def down
  	add_column :topics, :namespace

  	Topic.all.select { |t| t.name.include?("/") }.each do |t|
  		old_name = t.name.split("/")
  		if old_names.size > 1
  			t.namespace = old_name.take(old_name.size - 1)
  			t.name = old_name.last
  			t.save
  		end
  	end
  end
end
