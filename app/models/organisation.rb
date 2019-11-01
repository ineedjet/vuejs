class Organisation < ApplicationRecord
  has_many :equipments, dependent: :destroy
end