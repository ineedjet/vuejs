class Client < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable

  has_many :interactions
  has_many :organisations, through: :interactions, dependent: :destroy

  def reset_password!
    self.password = Devise.friendly_token.first(10)
  end
end
