class FormOfOwnershipToString < ActiveRecord::Migration[5.2]
  def change
    change_column :organisations, :form_of_ownership, :string
  end
end
