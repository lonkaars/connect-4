from flask import Blueprint, request
from main import cursor
from auth.login_token import token_login

info = Blueprint('info', __name__)

@info.route('/info')
def index():
    data = request.get_json()

    username = data.get("username") or ""
    id = data.get("id") or ""
    token = request.cookies.get("token") or ""

    if not username and \
       not id and \
       not token:
           return "", 400

    if token: id = token_login(token)[0]

    if username:
        user = cursor.execute("select username, user_id, country, type, registered, avatar from users where username = ?", [username]).fetchone()
    else:
        user = cursor.execute("select username, user_id, country, type, registered, avatar from users where user_id = ?", [id]).fetchone()

    #TODO: rating uitrekenen zodra er game functionaliteit is
    return {
        "username": user[0],
        "id": user[1],
        "country": user[2],
        "type": user[3],
        "registered": user[4],
        "avatar": user[5],
    }
