class Staff::ClientsController < ApplicationController
  before_action :authenticate_staff!

  def index
    @clients = Client.order(created_at: :desc)
    render json: @clients
  end

  def create
    @client = Client.new(client_params)

    if @client.save
      render json: ClientSerializer.new(@client).serialized_json, status: :created
    else
      render json: errors_json, status: :unprocessable_entity
    end
  end

  private

  def client_params
    params.require(:client).permit(:name, :email)
  end
end
