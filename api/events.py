from flask import Blueprint, request, make_response
from flask_socketio import SocketIO, emit, Namespace, join_room, leave_room, rooms
from socket_io import io
from auth.login_token import token_login
from http import cookies

from game.cleanup import set_interval
import time

def get_token(environ):
    cookie = environ.get("HTTP_COOKIE")
    if not cookie: return None

    parsed = cookies.SimpleCookie()
    parsed.load(cookie)

    token = parsed.get("token")
    if not token: return None

    return token.value

@io.on("connect")
def connect():
    token = get_token(request.environ)
    if not token: return

    user_id = token_login(token)
    if not user_id: return

    join_room("user-" + user_id)

