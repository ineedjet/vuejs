class Organisation < ApplicationRecord
  has_many :equipments, dependent: :destroy
  has_many :interactions
  has_many :clients, through: :interactions, dependent: :destroy
end