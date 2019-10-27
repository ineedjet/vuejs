class AddPhoneToClient < ActiveRecord::Migration[5.2]
  def change
    add_column :clients, :phone, :string
    add_column :staffs, :phone, :string
  end
end
