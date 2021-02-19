from flask import Blueprint, request, make_response
from flask_socketio import SocketIO, emit, Namespace
from game.voerbak_connector import bord
from db import cursor
import time
import json

class game:
    def __init__(self, game_id, io):
        self.game_id = game_id
        self.board = bord(7, 6)
        self.io = io

    def move(self, user_id, column):
        # player_1 = cursor.execute("select player_1_id from games where game_id = ?", [self.game_id]).fetchone()[0]
        # player_1_move = player_1 == user_id
        # if not self.board.player_1 == player_1_move: return
        self.board.drop_fisje(column)
        self.io.emit("fieldUpdate", { "field": self.board.board })

def run(app):
    io = SocketIO(app, cors_allowed_origins="*")
    games = [game("test_game", io)]

    namespace = "/game/socket/"
    @io.on("connect", namespace)
    def connect():
        print("connect")

    @io.on("newMove")
    def new_move(data):
        # json_data = json.loads(data)
        games[0].move(data["token"], data["move"])

    io.run(app, host="127.0.0.1", port=5000, debug=True)

