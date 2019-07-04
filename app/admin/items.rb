ActiveAdmin.register Item do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  permit_params :name, :item_type, :thing, :thing_id, :item_type_id, links_attributes: [:id, :url, :_destroy]
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
  		f.input :item_type
  		f.input :thing
  	end
  	f.inputs do
      f.object.links.build if f.object.links.empty?
  		f.has_many :links, allow_destroy: true, new_record: true, reject_if: proc { |attrs| attrs['url'].blank? } do |a|
  			a.input :url
  		end
  	end
  	f.actions
  end

  controller do
    defaults :finder => :from_param
  end
end
