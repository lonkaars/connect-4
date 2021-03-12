from flask import Blueprint, request
from db import cursor, connection
from auth.login_token import token_login
import json

def format_preferences(preferences): #TODO: remove excess properties (create preferences class?)
    return json.dumps(preferences) or ""

preferences = Blueprint('preferences', __name__)

@preferences.route('/preferences', methods = ["GET"])
def get_preferences():
    data = request.get_json()

    token = request.cookies.get("token") or ""

    if not token: return "", 401
    login = token_login(token) or ""

    if not login: return "", 403

    user_prefs = cursor.execute("select preferences from users where user_id = ?", [login]).fetchone()
    return { "preferences": json.loads(user_prefs[0]) }, 200

@preferences.route('/preferences', methods = ["POST"])
def index():
    data = request.get_json()

    new_preferences = data.get("newPreferences") or ""
    token = request.cookies.get("token") or ""

    if not token: return "", 401
    login = token_login(token) or ""

    if not login: return "", 403

    formatted_json = format_preferences(new_preferences)
    if not formatted_json: return "", 400

    cursor.execute("update users set preferences = ? where user_id = ?", [formatted_json, login])
    connection.commit()

    return "", 200

dynamic_route = ["/user", preferences]

