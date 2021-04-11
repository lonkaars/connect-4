from flask import Blueprint, request
from db import cursor, connection
from hierarchy import auth_required
from user.info import format_user
import time

requests = Blueprint('requests', __name__)


@requests.route("/requests")
@auth_required("user")
def route(user_2_id):
	# get a list of friend requests
	request_list = cursor.execute(
	    "select user_1_id from social where user_2_id = ? and type = \"outgoing\"",
	    [user_2_id]
	).fetchall()

	# get user_id for each result to prevent repeat user/info requests
	formatted_request_list = []
	for user_1_id in [q[0] for q in request_list]:
		formatted_request_list.append(format_user(user_1_id))

	return {"requests": formatted_request_list}, 200


dynamic_route = ["/social/list", requests]
