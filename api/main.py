import dynamic_import
from app import app

from socket_io import io
import game.socket

# start the flask/socket.io server
if __name__ == "__main__":
    io.run(app, host="127.0.0.1", port=5000, debug=True)

