from flask import Blueprint, request
from db import cursor, connection
from auth.login_token import token_login
from ruleset import resolve_ruleset
import json

class preferences_class:
    def __init__(self, preferences):
        self.darkMode = preferences.get("darkMode") or False
        self.ruleset = resolve_ruleset(json.dumps(preferences.get("ruleset") or {}) or "default")
        self.userColors = {
                "diskA": preferences.get("userColors", {}).get("diskA") or "",
                "diskB": preferences.get("userColors", {}).get("diskB") or "",
                "background": preferences.get("userColors", {}).get("background") or ""
                }

def format_preferences(prefs):
    return json.dumps((preferences_class(prefs)).__dict__)

preferences = Blueprint('preferences', __name__)

@preferences.route('/preferences', methods = ["GET"])
def get_preferences():
    data = request.get_json()

    token = request.cookies.get("token") or ""

    if not token: return "", 401
    login = token_login(token) or ""

    if not login: return "", 403

    user_prefs = cursor.execute("select preferences from users where user_id = ?", [login]).fetchone()
    return { "preferences": format_preferences(json.loads(user_prefs[0])) }, 200

@preferences.route('/preferences', methods = ["POST"])
def index():
    data = request.get_json()

    new_preferences = data.get("newPreferences") or ""
    token = request.cookies.get("token") or ""

    if not token: return "", 401
    login = token_login(token) or ""

    if not login: return "", 403

    preferences_json = {}
    try:
        preferences_json = json.loads(new_preferences)
    except ValueError as e:
        return "", 400

    formatted_json = format_preferences(preferences_json)

    cursor.execute("update users set preferences = ? where user_id = ?", [formatted_json, login])
    connection.commit()

    return "", 200

dynamic_route = ["/user", preferences]

