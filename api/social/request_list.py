from flask import Blueprint, request
from db import cursor, connection
from auth.login_token import token_login
from user.info import format_user
import time

requests = Blueprint('requests', __name__)

@requests.route("/requests")
def route():
    token = request.cookies.get("token") or ""
    if not token: return "", 401
    user_2_id = token_login(token) or ""
    if not user_2_id: return "", 403

    request_list = cursor.execute("select user_1_id from social where user_2_id = ? and type = \"outgoing\"",
            [user_2_id]).fetchall()

    formatted_request_list = []
    for user_1_id in [q[0] for q in request_list]:
        formatted_request_list.append(format_user(user_1_id))

    return { "requests": formatted_request_list }, 200

dynamic_route = ["/social/list", requests]

