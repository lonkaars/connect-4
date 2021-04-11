from flask import Blueprint, request
from db import cursor, connection
from hierarchy import auth_required
import json

status = Blueprint('user_status', __name__)


@status.route('/status', methods=['POST'])
@auth_required("user")
def index(user_id):
	data = request.get_json()
	status = data.get("status") or ""
	if not status: return "", 400

	cursor.execute(
	    "update users set status = ? where user_id = ?",
	    [status[0:200], user_id]
	)
	connection.commit()

	return "", 200


dynamic_route = ["/user", status]
