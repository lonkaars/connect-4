from flask import Blueprint, request
from functools import reduce
from db import cursor
from auth.login_token import token_login
from user.info import format_user
from ruleset import resolve_ruleset

def outcome(outcome_str, player_1):
    outcome_int = { "w": 1, "l": -1, "d": 0 }[outcome_str]
    if not player_1: outcome_int *= -1
    return { 1: "w", -1: "l", 0: "d" }[outcome_int]

def format_game(game_id, user_id = None):
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
    opponent = game[4] if is_player_1 else game[3]
    return {
        "id": game[0],
        "parent": game[1],
        "moves": [] if len(game[2]) == 0 else [int(move) for move in str(game[2] + "0").split(",")],
        "opponent": None if not opponent else format_user(opponent),
        "outcome": None if not game[5] else outcome(game[5], is_player_1),
        "created": game[6],
        "started": game[7],
        "duration": game[8],
        "rating": game[9] if is_player_1 else game[10],
        "rating_opponent": game[10] if is_player_1 else game[9],
        "ruleset": resolve_ruleset(game[11]),
        "status": game[12],
        "private": bool(game[13]),
    }

def valid_game_id(game_id):
    query = cursor.execute("select game_id from games where game_id = ?", [game_id]).fetchone()
    return bool(query)

game_info = Blueprint('game_info', __name__)

@game_info.route('/info', methods = ['POST'])
def index():
    data = request.get_json()
    if not data: return "", 400

    game_id = data.get("id") or ""
    if not game_id: return "", 400

    user_id = None
    token = request.cookies.get("token") or ""
    if token: user_id = token_login(token)

    if not valid_game_id(game_id): return "", 403

    return format_game(game_id, user_id), 200

dynamic_route = ["/game", game_info]
