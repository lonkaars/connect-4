from flask import Blueprint, request
from db import cursor

password = Blueprint('password', __name__)


# this endpoint is unfinished
@password.route('/password')
def index():
	data = request.get_json()

	if not data["password"] or \
                         not data["newPassword"]:
		return "", 400

	return {}, 200


dynamic_route = ["/user", password]
