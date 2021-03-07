from flask import Blueprint, request
from db import cursor
from auth.login_token import token_login

preferences = Blueprint('preferences', __name__)

@preferences.route('/preferences')
def index():
    data = request.get_json()

    token = request.cookies.get("token") or ""

    if not token: return "", 401
    login = token_login(token) or ""

    if not login: return "", 403

    user_prefs = cursor.execute("select preferences from users where user_id = ?", [login]).fetchone()
    return { "preferences": user_prefs[0] }, 200

dynamic_route = ["/user", preferences]

