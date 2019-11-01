class CreateEquipment < ActiveRecord::Migration[5.2]
  def change
    create_table :equipment do |t|
      t.string     :title,        null: false
      t.string     :kind,         null: false
      t.string     :sn,           null: false
      t.belongs_to :organisation, foreign_key: true

      t.timestamps
    end
  end
end
