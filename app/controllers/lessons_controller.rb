class LessonsController < ApplicationController
  before_action :set_lesson, only: [:update_reading, :update_listening, :reading, :listening]
  skip_before_action :authenticate_user!

  def show
    @lesson = Lesson.find(params[:id])
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

  def update_reading
    @lesson.update(lesson_params)
    redirect_to listening_lesson_path(@lesson)
  end

  def update_listening
    @lesson.update(lesson_params)
    recite = Recite.new()
    recite.lesson = @lesson
    recite.save
    redirect_to recite_path(recite)
  end

  def reading
  end

  def listening
  end

  private

  def set_lesson
    @lesson = Lesson.find(params[:id])
  end

  def lesson_params
    params.require(:lesson).permit(:reading_progression, :listening_progression)
  end
end
