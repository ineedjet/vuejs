class Equipment < ApplicationRecord
  belongs_to :organisation
  validates :title, presence: true
  validates :kind, presence: true
  validates :sn, presence: true
end