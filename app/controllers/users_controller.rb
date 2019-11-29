class UsersController < ApplicationController
  def dashboard
    @lessons = current_user.lessons
    @recites = current_user.recites
    @index_image = ['lion.svg', 'turtle.svg', 'sloth.svg', 'lobster.svg', 'ant.svg', 'toucan.svg', 'bird.svg', 'alpaca.svg', 'ferret.svg', 'fennec.svg', 'bee.svg', 'fox.svg', 'fox2.svg', 'cat.svg', 'bee2.svg', 'cocci.svg', 'rena.svg', 'snowm.png', 'kids.png']
  end
end
