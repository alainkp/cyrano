class PoemsController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @index_image = ['lion.svg', 'turtle.svg', 'sloth.svg', 'lobster.svg', 'ant.svg', 'toucan.svg', 'bird.svg', 'alpaca.svg', 'ferret.svg', 'fennec.svg', 'bee.svg', 'fox.svg', 'fox2.svg', 'cat.svg', 'bee2.svg', 'cocci.svg', 'rena.svg', 'snowm.png', 'kids.png']
    if params[:query].present?
      sql_query = "title ILIKE :query OR author_name ILIKE :query"
      @poems = Poem.where(sql_query, query: "%#{params[:query]}%")
    else
      @poems = Poem.all
    end
    # raise
  end

  def show
    @poem = Poem.find(params[:id])
    @lesson = Lesson.new
  end
end
