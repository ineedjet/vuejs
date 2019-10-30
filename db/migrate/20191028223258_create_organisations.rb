class CreateOrganisations < ActiveRecord::Migration[5.2]
  def change
    create_table :organisations do |t|
      t.string "name", null: false
      t.integer "form_of_ownership", null: false
      t.string "inn", null: false
      t.string "ogrn", null: false
      t.datetime "created_at", precision: 6, null: false
      t.datetime "updated_at", precision: 6, null: false
    end
  end
end
