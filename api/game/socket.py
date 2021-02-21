from flask import Blueprint, request, make_response
from flask_socketio import SocketIO, emit, Namespace
from game.voerbak_connector import bord
from auth.login_token import token_login
from db import cursor
import time
import json
from socket_io import io

games = {}

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
        self.io.emit("turnUpdate", { "player1": self.board.player_1 })
        if len(self.board.win_positions) > 0 or self.board.board_full:
            self.io.emit("finish", {
                "winPositions": self.board.win_positions,
                "boardFull": self.board.board_full
                })

@io.on("newMove")
def new_move(data):
    print("socket.py")
    print(games)
    print(data)
    game = games[data["game_id"]]
    if(len(game.board.win_positions) > 0 or game.board.board_full): return
    user_id = token_login(data["token"])[0]
    game.move(user_id, data["move"])

