from flask_socketio import SocketIO
from app import app

# socket.io wrapper to avoid circular imports (same as db.py)
io = SocketIO(app, cors_allowed_origins="*")

