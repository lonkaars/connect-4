from flask import Blueprint
from db import cursor
import json

version = {
    "number": json.loads(open("package.json", "r").read())["version"],
    "commit": open(".git/refs/heads/master", "r").read().strip()
}

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
        ),
        "version":
        version
    }


dynamic_route = ["/", status]
