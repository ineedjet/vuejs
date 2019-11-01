class Api::Staff::EquipmentsController < ApplicationController
  before_action :authenticate_staff!
  before_action :set_organisation, only: %i[create]

  def create
    @equipment = Equipment.new(equipment_params)
    @organisation.equipments << @equipment

    if @equipment.save
      render json: @equipment.to_json, status: :created
    else
      render json: errors_json, status: :unprocessable_entity
    end
  end

  def validate
    @equipment = Equipment.new(equipment_params)
    @equipment.valid?

    if errors_json.empty?
      render json: equipment_params.as_json, status: :ok
    else
      render json: errors_json, status: :unprocessable_entity
    end
  end

  private

  def equipment_params
    params.require(:equipment).permit(:title, :kind, :sn)
  end

  def errors_json
    @equipment
        .errors
        .as_json
        .as_json(only: equipment_params.keys.map(&:to_sym))
  end

  def set_organisation
    @organisation = Organisation.find(params[:organisation_id])
  end
end