# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.delete_all
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

Link.delete_all
Item.delete_all
PersonIdeaSet.delete_all
TopicIdeaSet.delete_all
Person.delete_all
Topic.delete_all
IdeaSet.delete_all

ItemType.delete_all

ItemType.create!(id: 'article')
ItemType.create!(id: 'audio')
ItemType.create!(id: 'book')
ItemType.create!(id: 'summary')
ItemType.create!(id: 'chat')
ItemType.create!(id: 'course')
ItemType.create!(id: 'code')
ItemType.create!(id: 'image')
ItemType.create!(id: 'livestream')
ItemType.create!(id: 'interactive')
ItemType.create!(id: 'newsletter')
ItemType.create!(id: 'certification')
ItemType.create!(id: 'podcast')
ItemType.create!(id: 'quora')
ItemType.create!(id: 'reddit')
ItemType.create!(id: 'researchpaper')
ItemType.create!(id: 'qna')
ItemType.create!(id: 'video')
ItemType.create!(id: 'wiki')
ItemType.create!(id: 'meetup')
ItemType.create!(id: 'app')
ItemType.create!(id: 'game')
ItemType.create!(id: 'people')

learning = Topic.create!(name: 'learning', search_index: 'learning')
thinking = Topic.create!(name: 'thinking', search_index: 'thinking')
communicating = Topic.create!(name: 'communicating', search_index: 'communicating')
reading = Topic.create!(name: 'reading', search_index: 'reading')
writing = Topic.create!(name: 'writing', search_index: 'writing')
speaking = Topic.create!(name: 'speaking', search_index: 'speaking')
listening = Topic.create!(name: 'listening', search_index: 'listening')

probability = Topic.create!(name: 'probability', search_index: 'probability')
logic = Topic.create!(name: 'logic', search_index: 'logic')
statistics = Topic.create!(name: 'statistics', search_index: 'statistics')

# Person.create!(name: 'Barbara Oakley')
# Person.create!(name: 'Josh Waitzkin')
# sivers = Person.create!(name: 'Derek Sivers', twitter: 'sivers', website: 'https://sivers.org/')
# nicky = Person.create!(name: 'Nicky Case', twitter: 'ncasenmare', website: 'https://ncase.me')

=begin
th = IdeaSet.create!(name: 'learning how to learn')
TopicIdeaSet.create!(topic: learning, idea_set: th)

th = IdeaSet.create!(name: 'the art of learning')
TopicIdeaSet.create!(topic: learning, idea_set: th)

th = IdeaSet.create!(name: 'how to remember anything forever')
TopicIdeaSet.create!(topic: learning, idea_set: th)
PersonIdeaSet.create!(person: nicky, idea_set: th, role: 'creator')
it = Item.create!(idea_set: th, name: th.name, item_type_id: 'interactive')
Link.create!(item: it, url: 'https://ncase.me/remember/')

th = IdeaSet.create!(name: 'there is no speed limit')
TopicIdeaSet.create!(topic: learning, idea_set: th)
PersonIdeaSet.create!(person: sivers, idea_set: th, role: 'creator')
it = Item.create!(idea_set: th, name: th.name, item_type_id: 'article')
Link.create!(item: it, url: 'https://sivers.org/kimo')

th = IdeaSet.create!(name: 'how people learn')
TopicThing.create!(topic: learning, idea_set: th)
=end

# th = learning.idea_sets.create!(
# 	name: 'how to remember anything forever',
# 	items_attributes: [
# 		{
# 			name: 'how to remember anything forever',
# 			item_type_id: 'interactive',
# 			links_attributes: [
# 				{url: 'https://ncase.me/remember/'}
# 			]
# 		}
# 	]
# )

# PersonIdeaSet.create!(person: nicky, idea_set: th, role: 'creator')

