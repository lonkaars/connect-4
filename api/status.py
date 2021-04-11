from flask import Blueprint
from db import cursor

status = Blueprint('server_status', __name__)


@status.route('/status')
def index():
	return {
	    # "users": int,
	    "games":
	    len(
	        cursor.execute(
	            "select game_id from games where status = \"in_progress\""
	        ).fetchall()
	    )
	}


dynamic_route = ["/", status]
