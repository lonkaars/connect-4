from flask import Blueprint, request
from functools import reduce
from db import cursor
from user.info import format_user
from rating import outcome
from ruleset import resolve_ruleset
from hierarchy import game_id_with_viewer
import valid


def format_game(game_id, user_id=None):
	game = cursor.execute(
		"select " + ", ".join(
			[
				"game_id",  # 0
				"parent_game",  # 1
				"moves",  # 2
				"player_1_id",  # 3
				"player_2_id",  # 4
				"outcome",  # 5
				"created",  # 6
				"started",  # 7
				"duration",  # 8
				"rating_delta_player_1",  # 9
				"rating_delta_player_2",  # 10
				"ruleset",  # 11
				"status",  # 12
				"private",  # 13
			]
		) + " from games where game_id = ?",
		[game_id]
	).fetchone()

	is_player_1 = game[4] != user_id

	# get opponent from perspective of `user_id`
	#TODO: return .players as array of player_1 and player_2 but format_user()'d
	opponent = game[4] if is_player_1 else game[3]

	# parse moves into list and return empty list if moves string is empty
	moves = [] if len(game[2]) == 0 else [
		int(move) for move in str(game[2] + "0").split(",")
	]

	return {
		"id": game[0],
		"parent": game[1],
		"moves": moves,
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


game_info = Blueprint('game_info', __name__)


@game_info.route('/info', methods=['POST'])
@game_id_with_viewer
def index(game_id, viewer):
	return format_game(game_id, viewer), 200


dynamic_route = ["/game", game_info]
