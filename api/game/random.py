from flask import Blueprint, request, make_response
from db import cursor, connection
from randid import new_uuid
import time
import json
import random
from game.socket import game, games
from game.new import create_game, start_game
from auth.login_token import token_login
from socket_io import io

random_game = Blueprint('random', __name__)

@random_game.route('/random', methods = ['POST'])
def index():
    data = request.get_json()

    token = request.cookies.get("token") or ""
    user_id = data.get("user_id") or ""
    if not user_id and not token:
        print("a temporary user should be set up here")

    if not user_id and token:
        user_id = token_login(token)

    public_games = cursor.execute("select game_id from games where private = FALSE and status = \"wait_for_opponent\"").fetchall()

    timestamp = int( time.time() * 1000 )

    game_started = False

    if len(public_games) == 0:
        game_id = create_game(user_id)
        player_1 = True
    else:
        game_id = random.choice(public_games)[0]

        start_game(game_id, user_id)

        players = cursor.execute("select player_1_id, player_2_id from games where game_id = ?", [game_id]).fetchone()
        games[game_id] = game(game_id, io, players[0], players[1])

        io.emit("gameStart", room=games[game_id].room)

        player_1 = False
        game_started = True

    return { "id": game_id, "player_1": player_1, "game_started": game_started }, 200

dynamic_route = ["/game", random_game]
