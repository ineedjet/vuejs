class CreateInteractions < ActiveRecord::Migration[5.2]
  def change
    create_table :interactions do |t|
      t.belongs_to :client
      t.belongs_to :organisation

      t.timestamps
    end
  end
end
