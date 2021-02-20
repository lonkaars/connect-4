from flask import Blueprint, request, make_response
from db import cursor, connection
from randid import new_uuid
import time
import json
import random

random_game = Blueprint('random', __name__)

@random_game.route('/random', methods = ['POST'])
def index():
    data = request.get_json()

    user_id = data.get("user_id") or ""
    if not user_id:
        print("a temporary user should be set up here")

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

    return { "id": game_id }, 200
