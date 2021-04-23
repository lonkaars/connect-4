from flask_socketio import join_room
from socket_io import io
from hierarchy import io_auth_required


# global socket connection
@io.on("connect")
@io_auth_required("none")
def connect(data, user_id):
    if not user_id: return
    join_room("user-" + user_id)

