class PoemsController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @poems = Poem.all
  end

  def show
    @poem = Poem.find(params[:id])
    @lesson = Lesson.new
  end
end
