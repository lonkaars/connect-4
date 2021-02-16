from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

from status import status
from user.info import info
from auth.signup import signup
from auth.login import login
from auth.login_token import token
from game.new import new_game
import game.socket

app.register_blueprint(status, url_prefix='/')
app.register_blueprint(info, url_prefix='/user')
app.register_blueprint(signup, url_prefix='/auth')
app.register_blueprint(login, url_prefix='/auth')
app.register_blueprint(token, url_prefix='/auth')
app.register_blueprint(new_game, url_prefix='/game')

if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=5000, debug=True)
