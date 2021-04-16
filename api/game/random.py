from flask import Blueprint, request
from db import cursor, connection
from randid import new_uuid
import time
import json
import random
from game.socket import game, games
from game.new import create_game, start_game
from hierarchy import auth_required
from socket_io import io

random_game = Blueprint('random', __name__)


@random_game.route('/random')
@auth_required("user")
def index(user_id):
    # get public_games (random opponent queue)
    public_games = cursor.execute(
        "select game_id from games where private = FALSE and status = \"wait_for_opponent\""
    ).fetchall()

    game_started = False

    # create a new public game if the queue is empty
    if len(public_games) == 0:
        game_id = create_game(user_id)
        player_1 = True
    # otherwise join a random public game
    else:
        game_id = random.choice(public_games)[0]

        start_game(game_id, user_id)

        player_1 = False
        game_started = True

    return {
        "id": game_id,
        "player_1": player_1,
        "game_started": game_started
    }, 200


dynamic_route = ["/game", random_game]
