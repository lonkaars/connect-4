from app import app

from status import status
from user.info import info
from auth.signup import signup
from auth.login import login
from auth.login_token import token
from game.new import new_game
from game.random import random_game

app.register_blueprint(status, url_prefix='/')

app.register_blueprint(info, url_prefix='/user')

app.register_blueprint(signup, url_prefix='/auth')
app.register_blueprint(login, url_prefix='/auth')
app.register_blueprint(token, url_prefix='/auth')

app.register_blueprint(new_game, url_prefix='/game')
app.register_blueprint(random_game, url_prefix='/game')

from socket_io import io
import game.socket

if __name__ == "__main__":
    io.run(app, host="127.0.0.1", port=5000, debug=True)

