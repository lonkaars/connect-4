from flask import Blueprint, request, make_response
from db import cursor, connection
from randid import new_uuid
import time
import json
import random
from game.socket import io, games, game
from auth.login_token import token_login

random_game = Blueprint('random', __name__)

@random_game.route('/random', methods = ['POST'])
def index():
    data = request.get_json()

    token = request.cookies.get("token") or ""
    user_id = data.get("user_id") or ""
    if not user_id and not token:
        print("a temporary user should be set up here")

    if not user_id and token:
        user_id = token_login(token)[0]

    public_games = cursor.execute("select game_id from games where private = FALSE and status = \"wait_for_opponent\"").fetchall()
    print(public_games)
    if len(public_games) == 0:
        game_id = new_uuid("games")

        cursor.execute("insert into games values (?, NULL, NULL, ?, NULL, NULL, 0, NULL, NULL, NULL, \"wait_for_opponent\", \"default\", FALSE) ", (game_id, user_id))
        connection.commit()
    else:
        game_id = random.choice(public_games)[0]
        timestamp = int( time.time() * 1000 )
        cursor.execute("update games set player_2_id = ?, status = \"in_progress\", timestamp = ? where game_id = ?", (user_id, timestamp, game_id))
        connection.commit()

        players = cursor.execute("select player_1_id, player_2_id from games where game_id = ?", [game_id]).fetchone()
        games[game_id] = game(game_id, io, players[0], players[1])

    return { "id": game_id }, 200
