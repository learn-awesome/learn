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
PersonThing.delete_all
TopicThing.delete_all
Person.delete_all
Topic.delete_all
Thing.delete_all

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

learning = Topic.create!(name: 'learning')
thinking = Topic.create!(name: 'thinking')
communicating = Topic.create!(name: 'communicating')
reading = Topic.create!(name: 'reading')
writing = Topic.create!(name: 'writing')
speaking = Topic.create!(name: 'speaking')
listening = Topic.create!(name: 'listening')

probability = Topic.create!(name: 'probability')
logic = Topic.create!(name: 'logic')
statistics = Topic.create!(name: 'statistics')

Topic.create!(name: 'managing time')
Topic.create!(name: 'managing wealth')
Topic.create!(name: 'managing health')
Topic.create!(name: 'managing relationships')

Person.create!(name: 'Barbara Oakley')
Person.create!(name: 'Josh Waitzkin')
sivers = Person.create!(name: 'Derek Sivers', twitter: 'sivers', website: 'https://sivers.org/')
nicky = Person.create!(name: 'Nicky Case', twitter: 'ncasenmare', website: 'https://ncase.me')

=begin
th = Thing.create!(name: 'learning how to learn')
TopicThing.create!(topic: learning, thing: th)

th = Thing.create!(name: 'the art of learning')
TopicThing.create!(topic: learning, thing: th)

th = Thing.create!(name: 'how to remember anything forever')
TopicThing.create!(topic: learning, thing: th)
PersonThing.create!(person: nicky, thing: th, role: 'creator')
it = Item.create!(thing: th, name: th.name, item_type_id: 'interactive')
Link.create!(item: it, url: 'https://ncase.me/remember/')

th = Thing.create!(name: 'there is no speed limit')
TopicThing.create!(topic: learning, thing: th)
PersonThing.create!(person: sivers, thing: th, role: 'creator')
it = Item.create!(thing: th, name: th.name, item_type_id: 'article')
Link.create!(item: it, url: 'https://sivers.org/kimo')

th = Thing.create!(name: 'how people learn')
TopicThing.create!(topic: learning, thing: th)
=end

th = learning.things.create!(
	name: 'how to remember anything forever',
	items_attributes: [
		{
			name: 'how to remember anything forever',
			item_type_id: 'interactive',
			links_attributes: [
				{url: 'https://ncase.me/remember/'}
			]
		}
	]
)

PersonThing.create!(person: nicky, thing: th, role: 'creator')

