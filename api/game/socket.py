from flask import Blueprint, request, make_response
from flask_socketio import SocketIO, emit, Namespace
from game.voerbak_connector import bord
from db import cursor
import time
import json

class game:
    def __init__(self, game_id):
        self.game_id = game_id
        self.board = bord(7, 6)

    def move(self, user_id, column):
        # player_1 = cursor.execute("select player_1_id from games where game_id = ?", [self.game_id]).fetchone()[0]
        # player_1_move = player_1 == user_id
        # if not self.board.player_1 == player_1_move: return
        self.board.drop_fisje(column)

def run(app):
    io = SocketIO(app, cors_allowed_origins="*")

    namespace = "/game/socket/"
    @io.on("connect", namespace)
    def connect():
        print("new connection", namespace)

    @io.on("new_move")
    def connect(data):
        print("new_move")
        print(data)

    io.run(app, host="127.0.0.1", port=5000, debug=True)

