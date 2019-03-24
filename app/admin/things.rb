ActiveAdmin.register Thing do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  permit_params :name, items_attributes: [:id, :name, :item_type, :_destroy, :links_attributes]
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end
  form do |f|
  	f.inputs 'Details' do
  		f.input :name
  	end
  	f.inputs do
  		f.has_many :items, allow_destroy: true, new_record: true do |a|
  			a.inputs do
	  			a.input :name
	  			a.input :item_type
		  		a.has_many :links, allow_destroy: true, new_record: true do |b|
		  			b.input :url
		  		end
		  	end
  		end
  	end
  	f.actions
  end
end
