class PoemsController < ApplicationController
  skip_before_action :authenticate_user!
  def show
    @poem = Poem.find(params[:id])
  end

  def index
    @poems = Poem.all
  end
end
