class Api::Staff::OrganisationsController < ApplicationController
  before_action :authenticate_staff!
  before_action :set_organisation, only: %i[destroy]

  def index
    find_organisations = ::FindOrganisations.new(Organisation.all, params)
    @organisations = find_organisations.call(search_permitted_params)
    org_presenter_meta = OrganisationPresenter.new().meta
    meta = find_organisations.meta.merge(org_presenter_meta)

    render json: OrganisationSerializer.new(@organisations, { meta: meta }).serialized_json
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

  def search_permitted_params
    params.permit(:filter, :sortBy, :descending, :page, :rowsPerPage, :rowsNumber)
  end

  def organisation_params
    params.require(:organisation).permit(:name, :form_of_ownership, :inn, :ogrn)
  end

  def set_organisation
    @organisation = Organisation.find(params[:id])
  end
end