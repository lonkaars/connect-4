from flask import Blueprint, request
from functools import reduce
from mergedeep import merge
from db import cursor
from auth.login_token import token_login
from user.info import format_user
from ruleset import resolve_ruleset
from game.info import format_game
import json

# get total game outcome amount for user
def sum_games(user_id): #! SANITIZE USER_ID FIRST
    wld_querys = [' '.join([
        "select count(game_id)",
        "from games",
        "where",
        f"player_{x[0]}_id = \"{user_id}\" and",
        f"outcome = \"{x[1]}\"",
    ]) for x in [(1, "w"), (1, "l"), (2, "w"), (2, "l")]]
    wld_querys.insert(0, ' '.join([
        "select count(game_id)",
        "from games",
        "where",
        f"(player_1_id = \"{user_id}\" or player_2_id = \"{user_id}\") and",
        "outcome = \"d\"",
    ]))

    big_query = "select " + ", ".join([f"({query})" for query in wld_querys])

    results = cursor.execute(big_query).fetchone()

    # win and lose are calculated from user_id's perspective (player_1_id, player_2_id in db)
    return {
            "draw": results[0],
            "win": results[1] + results[4],
            "lose": results[2] + results[3],
            "games": reduce(lambda a, b: a + b, results)
    }

# get `count` games that `user_id` participated in, sorted by newest game
def fetch_games(user_id, count):
    game_ids = cursor.execute("select game_id from games where player_1_id = ? or player_2_id = ? order by created desc", [user_id, user_id]).fetchmany(count)
    export = []

    for game_id in game_ids:
        export.append(format_game(game_id[0], user_id))

    return export

games = Blueprint('games', __name__)

@games.route('/games', methods = ['GET', 'POST'])
def index():
    data_string = request.data or "{}"
    data = json.loads(data_string)

    user_id = data.get("id") or ""
    token = request.cookies.get("token") or ""

    if not user_id and \
       not token:
           return "", 400

    if token and not user_id:
        user_id = token_login(token)

    if not cursor.execute("select user_id from users where user_id = ?", [user_id]).fetchone(): return "", 403

    export = {}
    merge(export,
          {"totals": sum_games(user_id)},
          {"games": fetch_games(user_id, 20)})

    return export, 200

dynamic_route = ["/user", games]
