ActiveAdmin.register IdeaSet do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
  permit_params :name, items_attributes: [:id, :name, :item_type_id, :_destroy, :links_attributes],
    topic_idea_sets_attributes: [:id, :topic_id],
    person_idea_sets_attributes: [:id, :person_id]
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end
  form do |f|
    f.object.items.build if f.object.items.empty?
    f.object.topic_idea_sets.build if f.object.topic_idea_sets.empty?
    f.object.person_idea_sets.build if f.object.person_idea_sets.empty?

  	f.inputs 'Details' do
  		f.input :name
  	end
  	f.inputs do
      f.has_many :topic_idea_sets, allow_destroy: true, new_record: true, reject_if: proc { |attrs| attrs['topic'].blank? } do |x|
        x.inputs do
          x.input :topic
        end
      end

      f.has_many :person_idea_sets, allow_destroy: true, new_record: true, reject_if: proc { |attrs| attrs['person'].blank? } do |x|
        x.inputs do
          x.input :person
        end
      end

  		f.has_many :items, allow_destroy: true, new_record: true, reject_if: proc { |attrs| attrs['name'].blank? } do |a|
        a.object.links.build if a.object.links.empty?
  			a.inputs do
	  			a.input :name
	  			a.input :item_type
		  		a.has_many :links, allow_destroy: true, new_record: true, reject_if: proc { |attrs| attrs['url'].blank? } do |b|
		  			b.input :url
		  		end
		  	end
  		end
  	end
  	f.actions
  end
end
