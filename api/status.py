from flask import Blueprint
from db import cursor
import json

HEAD = open("../.git/HEAD", "r").read().split(" ")[1].strip()
commit = open("../.git/" + HEAD, "r").read().strip()

version = {
    "number": json.loads(open("../package.json", "r").read())["version"],
    "commit": commit,
    "commit_short": commit[0:8]
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
