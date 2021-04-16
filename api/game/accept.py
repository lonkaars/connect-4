from flask import Blueprint, request, make_response
from db import cursor, connection
from randid import new_uuid
import time
import json
import random
from game.socket import game, games
from hierarchy import game_id_with_viewer
from socket_io import io
from game.new import start_game

join_game = Blueprint('game_accept', __name__)


# join a game by game_id (public or private)
@join_game.route('/accept', methods=['POST'])
@game_id_with_viewer
def index(game_id, user_id):
    if not user_id: return "", 400
    if cursor.execute("select status from games where game_id = ?",
                      [game_id]).fetchone()[0] != "wait_for_opponent":
        return "", 403

    start_game(game_id, user_id)

    return {"id": game_id, "player_1": False, "game_started": True}, 200


dynamic_route = ["/game", join_game]
