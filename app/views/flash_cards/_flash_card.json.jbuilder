json.extract! flash_card, :id, :user, :question, :answer, :level, :last_practised_at, :created_at, :updated_at
json.url flash_card_url(flash_card, format: :json)
