from flask import Blueprint, request, make_response
from db import cursor, connection
from randid import new_uuid
import time
import json

new_game = Blueprint('new', __name__)

@new_game.route('/new', methods = ['POST'])
def index():
    data = request.get_json()

    user_id = data.get("user_id") or "" # maybe set up a temporary user here?
    game_settings = data.get("settings") or ""

    if not user_id:
        print("a temporary user should be set up here")

    game_id = new_uuid("games")
    timestamp = int( time.time() * 1000 )

    cursor.execute("insert into games values (?, NULL, NULL, ?, NULL, NULL, ?, NULL, NULL, NULL, \"wait_for_opponent\", ?) ", (game_id, user_id, timestamp, json.dumps(game_settings)))
    connection.commit()

    return { "id": game_id }, 200
