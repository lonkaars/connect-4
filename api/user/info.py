from flask import Blueprint, request
from db import cursor
from auth.login_token import token_login
import json

def format_user(user_id):
    user = cursor.execute("select username, user_id, country, type, registered, avatar from users where user_id = ?", [user_id]).fetchone()
    return {
        "username": user[0],
        "id": user[1],
        "country": user[2],
        "type": user[3],
        "registered": user[4],
        "avatar": user[5],
    }

info = Blueprint('info', __name__)

@info.route('/info', methods = ['GET', 'POST'])
def index():
    data_string = request.data or "{}"
    data = json.loads(data_string)

    username = data.get("username") or ""
    user_id = data.get("id") or ""
    token = request.cookies.get("token") or ""

    if not username and \
       not user_id and \
       not token:
           return "", 400

    if token:
        user_id = token_login(token)
    elif username:
        temp_user_id = cursor.execute("select user_id from users where username = ?", [username]).fetchone()
        if temp_user_id:
            user_id = temp_user_id[0]

    user = format_user(user_id)

    if not user: return "", 403

    #TODO: rating uitrekenen zodra er game functionaliteit is
    return user

dynamic_route = ["/user", info]
