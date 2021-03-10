from flask import Blueprint, request
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
    return {
        "id": game[0],
        "parent": game[1],
        "moves": game[2],
        "opponent": game[3] if game[3] != user_id else game[4],
        "outcome": game[5],
        "created": game[6],
        "started": game[7],
        "duration": game[8],
        "rating": game[9] if game[3] != user_id else game[10],
        "rating_opponent": game[10] if game[3] != user_id else game[9],
        "ruleset": resolve_ruleset(game[11]),
        "status": game[12],
        "private": game[13],
    }

def sum_games(user_id):
    print('gert')

def fetch_games(user_id, count):
    game_ids = cursor.execute("select game_id from games where player_1_id = ? or player_2_id = ? order by created", [user_id, user_id]).fetchmany(count)
    export = []

    for game_id in game_ids:
        export.append(game_info(game_id[0], user_id))

    return export

games = Blueprint('games', __name__)

@games.route('/games', methods = ['GET', 'POST'])
def index():
    print(fetch_games("4577c119-c768-4ad5-afec-b53a5c19baf4", 10))
    return "", 200

dynamic_route = ["/user", games]
