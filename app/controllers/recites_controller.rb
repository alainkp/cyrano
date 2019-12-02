class RecitesController < ApplicationController
  def show
    @recite = Recite.find(params[:id])
    @poem = @recite.lesson.poem
  end

  def create
    @lesson = Lesson.find(params[:lesson_id])
    @recite = Recite.new()
    @recite.lesson = @lesson
    @recite.save
    redirect_to recite_path(@recite)
  end

  def update
    @recite = Recite.find(params[:id])
    current_progr = recite_params[:progression].to_i
    @recite.update(recite_params) if current_progr > @recite.progression
    redirect_to lesson_path(@recite.lesson)
  end

  private

  def recite_params
    params.require(:recite).permit(:progression)
  end
end
