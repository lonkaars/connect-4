from flask import Blueprint, request, make_response
from flask_socketio import SocketIO, emit, Namespace
from game.voerbak_connector import bord
from auth.login_token import token_login
from db import cursor, connection
import time
import json
from socket_io import io

games = {}
listeners = {}

class game:
    def __init__(self, game_id, io, player_1_id, player_2_id):
        self.game_id = game_id
        self.board = bord(7, 6)
        self.io = io
        self.player_1_id = player_1_id
        self.player_2_id = player_2_id

    def send(self, message, data):
        if not self.game_id in listeners: return
        for listener in listeners[self.game_id]:
            self.io.emit(message, data, room=listener)

    def move(self, user_id, column):
        if user_id != self.player_1_id and user_id != self.player_2_id: return
        move = self.player_1_id if self.board.player_1 else self.player_2_id
        if user_id != move: return

        self.board.drop_fisje(column)
        self.send("fieldUpdate", { "field": self.board.board })
        self.send("turnUpdate", { "player1": self.board.player_1 })
        if len(self.board.win_positions) > 0 or self.board.board_full:
            outcome = "d"
            if not self.board.board_full:
                winner = self.board.board[int(self.board.win_positions[0][0])]
                outcome = "w" if winner == "2" else "l"
            self.send("finish", {
                "winPositions": self.board.win_positions,
                "boardFull": self.board.board_full
                })
            self.close("finished", outcome)

        now = int( time.time() * 1000 )
        cursor.execute("update games set last_activity = ?, moves = moves || ? || ',' where game_id = ?", [now, column, self.game_id])
        connection.commit()

    def resign(self):
        self.board.kill_voerbak()
        self.send("resign", "")
        self.close("resign", "d")


    def close(self, new_status, outcome):
        cursor.execute(" ".join([
            "update games set",
            "moves = moves || '0',",
            "duration = ?,",
            "status = ?,",
            "outcome = ?",
            "where game_id = ?"
            ]), [
                int( time.time() * 1000 ) - cursor.execute("select started from games where game_id = ?", [self.game_id]).fetchone()[0],
                new_status,
                outcome,
                self.game_id
                ])
        connection.commit()

        games.pop(self.game_id)
        listeners.pop(self.game_id)

@io.on("newMove")
def new_move(data):
    if not data["game_id"] or \
       not data["move"] or \
       not data["token"]: return
    if not data["game_id"] in games: return

    game = games[data["game_id"]]
    if(len(game.board.win_positions) > 0 or game.board.board_full): return
    user_id = token_login(data["token"])
    game.move(user_id, data["move"])

@io.on("resign")
def resign(data):
    if not data["game_id"] or \
       not request.cookies.get("token"): return
    if not data["game_id"] in games: return

    user_id = token_login(request.cookies.get("token"))
    if not user_id: return

    if games[data["game_id"]].player_1_id != user_id and \
       games[data["game_id"]].player_2_id != user_id:
        return

    games[data["game_id"]].resign()

@io.on("registerGameListener")
def register_game_listener(data):
    if not data["game_id"]: return
    if not data["game_id"] in listeners: listeners[data["game_id"]] = set()
    listeners[data["game_id"]].add(request.sid)

