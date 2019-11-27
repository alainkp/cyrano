class PoemsController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @user_lessons = [current_user.lessons]
    @lessons = current_user.lessons
    # @poems_started = [Poem.all]
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
