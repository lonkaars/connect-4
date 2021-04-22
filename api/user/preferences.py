from flask import Blueprint, request
from db import cursor, connection
from ruleset import resolve_ruleset
from hierarchy import auth_required
import json


# fill missing dict keys in preferences object
def format_preferences(prefs):
    return {
        "darkMode":
        prefs.get("darkMode") or False,
        "ruleset":
        resolve_ruleset(json.dumps(prefs.get("ruleset") or {}) or "default"),
        "userColors": {
            "diskA": prefs.get("userColors", {}).get("diskA") or "",
            "diskB": prefs.get("userColors", {}).get("diskB") or "",
        },
        "theme":
        prefs.get("theme") or "default.css",
    }


preferences = Blueprint('preferences', __name__)


@preferences.route('/preferences', methods=["GET"])
@auth_required("user")
def get_preferences(login):
    user_prefs = cursor.execute(
        "select preferences from users where user_id = ?", [login]
    ).fetchone()
    return {"preferences": format_preferences(json.loads(user_prefs[0]))}, 200


@preferences.route('/preferences', methods=["POST"])
@auth_required("user")
def index(login):
    data = request.get_json()
    new_preferences = data.get("newPreferences") or ""

    formatted_json = format_preferences(new_preferences)

    cursor.execute(
        "update users set preferences = ? where user_id = ?",
        [json.dumps(formatted_json), login]
    )
    connection.commit()

    return "", 200


dynamic_route = ["/user", preferences]
