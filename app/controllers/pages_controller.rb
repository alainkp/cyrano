class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :components]

  def home
  end

  def components
    @lesson = Lesson.first
    @user = User.first
    @poem = Poem.find(186)
    @recite = Recite.first
  end
end
