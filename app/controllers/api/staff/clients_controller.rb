class Api::Staff::ClientsController < ApplicationController
  before_action :authenticate_staff!
  before_action :set_client, only: %i[destroy]

  def index
    @clients = Client.order(created_at: :asc)
    render json: @clients
  end

  def create
    @client = Client.new(client_params)

    if @client.save
      render json: @client, status: :created
    else
      render json: @client.errors.as_json, status: :unprocessable_entity
    end
  end

  def destroy
    @client.destroy

    head :no_content
  end

  private

  def client_params
    params.require(:client).permit(:name, :email, :phone, :password, :password_confirmation)
  end

  def set_client
    @client = Client.find(params[:id])
  end
end
