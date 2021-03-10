from flask import Blueprint, request
from functools import reduce
from mergedeep import merge
from db import cursor
from auth.login_token import token_login
from ruleset import resolve_ruleset
import json

def game_info(game_id, user_id = None):
    game = cursor.execute("select " + ", ".join([
        "game_id",               # 0
        "parent_game",           # 1
        "moves",                 # 2
        "player_1_id",           # 3
        "player_2_id",           # 4
        "outcome",               # 5
        "created",               # 6
        "started",               # 7
        "duration",              # 8
        "rating_delta_player_1", # 9
        "rating_delta_player_2", # 10
        "ruleset",               # 11
        "status",                # 12
        "private",               # 13
        ]) + " from games where game_id = ?", [game_id]).fetchone()
    is_player_1 = game[4] != user_id
    outcome = "d" if game[5] == "d" else \
        "w" if game[5] == "w" and is_player_1 else "d"
    return {
        "id": game[0],
        "parent": game[1],
        "moves": game[2],
        "opponent": game[3] if is_player_1 else game[4],
        "outcome": outcome,
        "created": game[6],
        "started": game[7],
        "duration": game[8],
        "rating": game[9] if is_player_1 else game[10],
        "rating_opponent": game[10] if is_player_1 else game[9],
        "ruleset": resolve_ruleset(game[11]),
        "status": game[12],
        "private": game[13],
    }

def sum_games(user_id): #! SANITIZE USER_ID FIRST
    wld_querys = [' '.join([
        "select count(game_id)",
        "from games",
        "where",
        f"(player_1_id = \"{user_id}\" or player_2_id = \"{user_id}\") and",
        f"outcome = \"{x}\"",
    ]) for x in ["w", "l", "d"]]

    big_query = "select " + ", ".join([f"({query})" for query in wld_querys])

    results = cursor.execute(big_query).fetchone()

    return {
            "win": results[0],
            "lose": results[1],
            "draw": results[2],
            "games": reduce(lambda a, b: a + b, results)
    }

def fetch_games(user_id, count):
    game_ids = cursor.execute("select game_id from games where player_1_id = ? or player_2_id = ? order by created", [user_id, user_id]).fetchmany(count)
    export = []

    for game_id in game_ids:
        export.append(game_info(game_id[0], user_id))

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

    if not cursor.execute("select user_id from users where user_id = ?", [user_id]).fetchone(): return "", 403

    if token and not user_id:
        user_id = token_login(token)

    export = {}
    merge(export,
          {"totals": sum_games(user_id)},
          {"games": fetch_games(user_id, 20)})

    return export, 200

dynamic_route = ["/user", games]
