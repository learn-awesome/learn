# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_04_140829) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "idea_sets", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "item_types", id: :string, force: :cascade do |t|
    t.string "display_name_plural"
  end

  create_table "items", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "item_type_id", null: false
    t.integer "estimated_time"
    t.integer "required_expertise"
    t.uuid "idea_set_id", null: false
    t.uuid "user_id", null: false
    t.integer "year"
    t.integer "inspirational_score"
    t.integer "educational_score"
    t.integer "challenging_score"
    t.integer "entertaining_score"
    t.integer "visual_score"
    t.integer "interactive_score"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["idea_set_id"], name: "index_items_on_idea_set_id"
    t.index ["item_type_id"], name: "index_items_on_item_type_id"
    t.index ["user_id"], name: "index_items_on_user_id"
  end

  create_table "links", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "url", null: false
    t.uuid "item_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_links_on_item_id"
  end

  create_table "people", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "website"
    t.string "email"
    t.string "twitter"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "person_idea_sets", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "person_id", null: false
    t.uuid "idea_set_id", null: false
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["idea_set_id"], name: "index_person_idea_sets_on_idea_set_id"
    t.index ["person_id"], name: "index_person_idea_sets_on_person_id"
  end

  create_table "reviews", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "item_id", null: false
    t.string "status", null: false
    t.integer "inspirational_score"
    t.integer "educational_score"
    t.integer "challenging_score"
    t.integer "entertaining_score"
    t.integer "visual_score"
    t.integer "interactive_score"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["item_id"], name: "index_reviews_on_item_id"
    t.index ["user_id", "item_id"], name: "index_reviews_on_user_id_and_item_id", unique: true
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "topic_idea_sets", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "topic_id", null: false
    t.uuid "idea_set_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["idea_set_id"], name: "index_topic_idea_sets_on_idea_set_id"
    t.index ["topic_id"], name: "index_topic_idea_sets_on_topic_id"
  end

  create_table "topic_relations", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "from_id", null: false
    t.uuid "to_id", null: false
    t.string "kind", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from_id"], name: "index_topic_relations_on_from_id"
    t.index ["to_id"], name: "index_topic_relations_on_to_id"
  end

  create_table "topics", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "search_index", null: false
    t.string "namespace"
    t.string "gitter_room"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_topics", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "topic_id", null: false
    t.string "action", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["topic_id"], name: "index_user_topics_on_topic_id"
    t.index ["user_id"], name: "index_user_topics_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "nickname", null: false
    t.string "auth0_uid", null: false
    t.text "authinfo", null: false
    t.string "image_url"
    t.string "bio"
    t.text "description"
    t.integer "score", default: 100, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "items", "idea_sets"
  add_foreign_key "items", "item_types"
  add_foreign_key "items", "users"
  add_foreign_key "links", "items"
  add_foreign_key "person_idea_sets", "idea_sets"
  add_foreign_key "person_idea_sets", "people"
  add_foreign_key "reviews", "items"
  add_foreign_key "reviews", "users"
  add_foreign_key "topic_idea_sets", "idea_sets"
  add_foreign_key "topic_idea_sets", "topics"
  add_foreign_key "topic_relations", "topics", column: "from_id"
  add_foreign_key "topic_relations", "topics", column: "to_id"
  add_foreign_key "user_topics", "topics"
  add_foreign_key "user_topics", "users"
end
