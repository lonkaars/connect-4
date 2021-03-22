from flask import Blueprint, request, make_response
from db import cursor, connection
from randid import new_uuid
import time
import json
import random
from game.socket import game, games
from auth.login_token import token_login
from game.info import valid_game_id
from socket_io import io
from game.new import start_game

join_game = Blueprint('game_accept', __name__)

@join_game.route('/accept', methods = ['POST'])
def index():
    data = request.get_json()

    token = request.cookies.get("token") or ""
    game_id = data.get("id") or ""

    if not valid_game_id(game_id): return "", 403

    if not token:
        print("a temporary user should be set up here")

    user_id = token_login(token)
    if not user_id: return "", 403

    if cursor.execute("select status from games where game_id = ?", [game_id]).fetchone()[0] != "wait_for_opponent":
        return "", 403

    start_game(game_id, user_id)

    return {
            "id": game_id,
            "player_1": False,
            "game_started": True
            }, 200

dynamic_route = ["/game", join_game]
