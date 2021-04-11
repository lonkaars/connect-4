from flask import Blueprint, request
from db import cursor
from user.info import format_user
import json

search = Blueprint('search', __name__)


@search.route('/search', methods=['POST'])
def index():
	data_string = request.data or "{}"
	data = json.loads(data_string)
	query = data.get("query") or ""
	if not query: return "", 400
	if len(query) < 3: return "", 403

	# use levenshtein with max distance 3 to search for users
	#TODO: use mysql and sort by best match
	results = cursor.execute(
		"select user_id from users where levenshtein(lower(username), lower(?), 3)",
		[query]
	).fetchmany(20)

	formatted = {"results": []}

	# get user_id for each result to prevent repeat user/info requests
	for user in results:
		formatted["results"].append(format_user(user[0]))

	return formatted, 200


dynamic_route = ["/social", search]
