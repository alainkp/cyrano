class UsersController < ApplicationController
  def dashboard
    @lessons = current_user.lessons
    @recites = current_user.recites
    @index_image = ['fennec.svg', 'bee.svg', 'fox.svg', 'fox2.svg', 'cat.svg', 'bee2.svg', 'fly.png', 'cocci.svg', 'kid.svg', 'rena.svg', 'bug.png', 'scar.png', 'snowm.png', 'kids.png']
  end
end
