class UsersController < ApplicationController
  def dashboard
    @lessons = current_user.lessons
    @recites = current_user.recites
  end
end
