class UsersController < ApplicationController
  def dashboard
    @lessons = current_user.lessons
    @recites = current_user.recites
    @index_image = ['fennec', 'bee', 'fox', 'fox2', 'cat', 'bee2', 'fly', 'cocci', 'kid', 'rena', 'bug', 'scar', 'snowm', 'kids']
  end
end
