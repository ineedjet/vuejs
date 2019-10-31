class Api::Staff::StaffsController < ApplicationController
  before_action :authenticate_staff!
  before_action :set_staff, only: %i[destroy]

  def index
    @staffs = Staff.order(created_at: :asc)
    render json: @staffs
  end

  def create
    @staff = Staff.new(staff_params)

    if @staff.save
      render json: @staff, status: :created
    else
      render json: @staff.errors.as_json, status: :unprocessable_entity
    end
  end

  def destroy
    @staff.destroy

    head :no_content
  end

  private

  def staff_params
    params.require(:staff).permit(:name, :email, :phone, :password, :password_confirmation)
  end

  def set_staff
    @staff = Staff.find(params[:id])
  end
end
