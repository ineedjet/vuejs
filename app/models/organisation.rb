class Organisation < ApplicationRecord
  has_many :equipments, dependent: :destroy
  has_many :interactions
  has_many :clients, through: :interactions, dependent: :destroy

  include PgSearch::Model
  pg_search_scope :search_by, against: %i[name inn ogrn], using: {
    tsearch: { prefix: true },
  }

  after_save :broadcast

  def self.search(query)
    return [] unless query
    search_by("#{query}")
  end

  def broadcast
    ActionCable.server.broadcast("organisations", content: { organisation: self })
  end
end