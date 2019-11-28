class PoemsController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @index_image = ['fennec', 'bee', 'fox', 'fox2', 'cat', 'bee2', 'fly', 'cocci', 'kid', 'rena', 'bug', 'scar', 'snowm', 'kids']
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
