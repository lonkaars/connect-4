from flask_socketio import SocketIO
from app import app

io = SocketIO(app, cors_allowed_origins="*")

