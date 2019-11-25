class LessonsController < ApplicationController
  skip_before_action :authenticate_user!, only: :show

  def show
    @lesson = Lesson.find(params[:id])
    @recite = Recite.new
  end

  def create
    @lesson = Lesson.new
    @poem = Poem.find(params[:poem_id])
    @user = current_user
    @lesson.user = @user
    @lesson.poem = @poem
    @lesson.save
    redirect_to lesson_path(@lesson)
  end
end
