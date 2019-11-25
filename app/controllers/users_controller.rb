class UsersController < ApplicationController
  def dashboard
    @lessons = current_user.lessons
  end
end
