from flask import Blueprint, request, make_response
from flask_socketio import SocketIO, emit, Namespace, join_room
from game.voerbak_connector import bord
from db import cursor, connection
from socket_io import io
from hierarchy import io_auth_required
import time
import json

games = {}


def participants_only(func):
    '''
	listener should have two parameters:
	listener(data: socket.io.data, user_id: str, game: game)

	listener should only be executed if the request comes from one of
	the game participants (player_1_id | player_2_id)
	'''
    def wrapper(data, user_id):
        game_id = data["game_id"]

        if not game_id or \
		   not game_id in games:
            return

        game = games[game_id]
        if game.player_1_id != user_id and \
           game.player_2_id != user_id:
            return

        return func(data, user_id, game)

    wrapper.__name__ = func.__name__
    return wrapper


class game:
    def __init__(self, game_id, io, player_1_id, player_2_id):
        self.game_id = game_id
        self.room = "game-" + game_id
        self.board = bord(7, 6)
        self.io = io
        self.player_1_id = player_1_id
        self.player_2_id = player_2_id

    # drop a disc in `column`
    def move(self, user_id, column):
        if len(self.board.win_positions) > 0: return
        if self.board.board_full: return

        move = self.player_1_id if self.board.player_1 else self.player_2_id
        if user_id != move: return

        self.board.drop_fisje(column)

        io.emit("fieldUpdate", {"field": self.board.board}, room=self.room)

        now = int(time.time() * 1000)
        cursor.execute(
            "update games set last_activity = ?, moves = moves || ? || ',' where game_id = ?",
            [now, column, self.game_id]
        )
        connection.commit()

        if len(self.board.win_positions) > 0 or self.board.board_full:
            outcome = "d"
            if not self.board.board_full:
                winner = self.board.board[int(self.board.win_positions[0][0])]
                outcome = "w" if winner == "2" else "l"
            io.emit(
                "finish", {
                    "winPositions": self.board.win_positions,
                    "boardFull": self.board.board_full
                },
                room=self.room
            )
            self.close("finished", outcome)
            return

        io.emit("turnUpdate", {"player1": self.board.player_1}, room=self.room)

    def resign(self):
        self.board.kill_voerbak()
        io.emit("resign", room=self.room)
        self.close("resign", "d")

    def close(self, new_status, outcome):
        cursor.execute(
            " ".join(
                [
                    "update games set", "moves = moves || '0',",
                    "duration = ?,", "status = ?,", "outcome = ?",
                    "where game_id = ?"
                ]
            ), [
                int(time.time() * 1000) - cursor.execute(
                    "select started from games where game_id = ?",
                    [self.game_id]
                ).fetchone()[0], new_status, outcome, self.game_id
            ]
        )
        connection.commit()

        games.pop(self.game_id)


@io.on("newMove")
@io_auth_required("none")
@participants_only
def new_move(data, user_id, game):
    move = data.get("move")
    if not move: return

    game.move(user_id, move)


@io.on("resign")
@io_auth_required("none")
@participants_only
def resign(data, user_id, game):
    game.resign()


@io.on("registerGameListener")
def register_game_listener(data):
    game_id = data.get("game_id")
    if not game_id: return

    join_room("game-" + game_id)
