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

ActiveRecord::Schema.define(version: 2019_11_26_104337) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "lessons", force: :cascade do |t|
    t.integer "reading_progression", default: 0
    t.integer "listening_progression", default: 0
    t.bigint "user_id"
    t.bigint "poem_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["poem_id"], name: "index_lessons_on_poem_id"
    t.index ["user_id"], name: "index_lessons_on_user_id"
  end

  create_table "poems", force: :cascade do |t|
    t.string "title"
    t.text "content"
    t.string "audio_url"
    t.integer "difficulty"
    t.string "author_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recites", force: :cascade do |t|
    t.integer "progression", default: 0
    t.integer "duration"
    t.bigint "lesson_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["lesson_id"], name: "index_recites_on_lesson_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "lessons", "poems"
  add_foreign_key "lessons", "users"
  add_foreign_key "recites", "lessons"
end
