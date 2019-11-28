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

  private

  def recite_params
  end
end
