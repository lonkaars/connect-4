from flask import Blueprint, request, make_response
from db import cursor, connection
from randid import new_uuid
import time
import json
import random
from game.socket import game, games
from hierarchy import auth_required
from game.info import valid_game_id
from socket_io import io
from game.new import start_game

join_game = Blueprint('game_accept', __name__)

@join_game.route('/accept', methods = ['POST'])
@auth_required("user")
def index(user_id):
    if cursor.execute("select status from games where game_id = ?", [game_id]).fetchone()[0] != "wait_for_opponent":
        return "", 403

    start_game(game_id, user_id)

    return {
            "id": game_id,
            "player_1": False,
            "game_started": True
            }, 200

dynamic_route = ["/game", join_game]
