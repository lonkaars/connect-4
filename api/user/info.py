from flask import Blueprint, request
from db import cursor
from rating import get_rating
from hierarchy import one_person
import json


# get relation to user_2_id from user_1_id's perspective
def get_relation_to(user_1_id, user_2_id):
	relation = cursor.execute("select * from social where " + \
                  "(user_1_id = ? and user_2_id = ?) or " + \
                  "(user_1_id = ? and user_2_id = ?)", [user_1_id, user_2_id, user_2_id, user_1_id]).fetchone()
	if not relation: return "none"
	if relation[2] == "friendship": return "friends"
	if relation[2] == "outgoing" and relation[0] == user_1_id:
		return "outgoing"
	if relation[2] == "outgoing" and relation[1] == user_1_id:
		return "incoming"
	if relation[2] == "block" and relation[0] == user_1_id: return "blocked"
	return "none"


# get users friend count
def count_friends(user_id):
	query = cursor.execute(
		"select type from social where (user_1_id = ? or user_2_id = ?) and type = \"friendship\"",
		[user_id, user_id]
	).fetchall()
	return len(query)  #FIXME: use SQL count() instead of python's len()


# get user/info of `user_id` as `viewer` (id)
def format_user(user_id, viewer=''):
	user = cursor.execute(
		"select " + ", ".join(
			[
				"username",
				"user_id",
				"country",
				"registered",
				"status",
			]
		) + " from users where user_id = ?", [user_id]
	).fetchone()
	formatted_user = {
		"username": user[0],
		"id": user[1],
		"country": user[2],
		"registered": user[3],
		"status": user[4],
		"friends": count_friends(user_id),
		"rating":
		get_rating(user_id),  #TODO: calculate rating based on game analysis
	}
	if viewer: formatted_user["relation"] = get_relation_to(viewer, user_id)
	return formatted_user


info = Blueprint('info', __name__)


# view own user/info if no user_id or username is provided and is logged in,
# else view user/info of user with user_id = `user_id` or username = `username`
@info.route('/info', methods=['GET', 'POST'])
@one_person
def index(user_id, viewer):
	user = format_user(user_id, viewer)
	return user, 200


dynamic_route = ["/user", info]
