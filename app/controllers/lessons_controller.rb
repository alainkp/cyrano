class LessonsController < ApplicationController
  before_action :set_lesson, only: [:update_reading, :update_listening, :reading, :listening]
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

  def update_reading
    current_progr = lesson_params[:reading_progression].to_i
    @lesson.update(lesson_params) if current_progr > @lesson.reading_progression
    redirect_to listening_lesson_path(@lesson)
  end

  def update_listening
    current_progr = lesson_params[:listening_progression].to_i
    @lesson.update(lesson_params) if current_progr > @lesson.listening_progression
    recite = Recite.new
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
