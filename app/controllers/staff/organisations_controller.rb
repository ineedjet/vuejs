class Staff::OrganisationsController < ApplicationController
  before_action :authenticate_staff!
  before_action :set_organisation, only: %i[destroy]

  def index
    @organisations = Organisation.order(created_at: :asc)
    render json: @organisations
  end

  def create
    @organisation = Organisation.new(organisation_params)

    if @organisation.save
      render json: @organisation, status: :created
    else
      render json: @organisation.errors.as_json, status: :unprocessable_entity
    end
  end

  def destroy
    @organisation.destroy

    head :no_content
  end

  private

  def organisation_params
    params.require(:organisation).permit(:name, :form_of_ownership, :inn, :ogrn)
  end

  def set_organisation
    @organisation = Organisation.find(params[:id])
  end
end