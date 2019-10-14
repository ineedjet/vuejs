class Staff::LandingController < ApplicationController
  layout 'staff'

  before_action :authenticate_staff!

  def index; end
end
