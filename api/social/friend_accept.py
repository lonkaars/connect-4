from flask import Blueprint, request
from db import cursor, connection
from auth.login_token import token_login
import time

accept = Blueprint('accept', __name__)

@accept.route("/accept", methods = ['POST'])
def route():
    data = request.get_json()

    user_1_id = data.get("id") or ""
    token = request.cookies.get("token") or ""

    if not token: return "", 401
    user_2_id = token_login(token) or ""

    if not user_1_id or \
       not user_2_id:
           return "", 403

    cursor.execute("update social set type = \"friendship\" where user_1_id = ? and user_2_id = ?",
            [user_1_id, user_2_id])
    connection.commit()

    return "", 200

dynamic_route = ["/social", accept]

