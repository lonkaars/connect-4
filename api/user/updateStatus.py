from flask import Blueprint, request
from db import cursor, connection
from auth.login_token import token_login
import json

updateStatus = Blueprint('updateStatus', __name__)

@updateStatus.route('/updateStatus', methods = ['POST'])
def index():
    data = request.get_json()

    status = data.get("status") or ""
    token = request.cookies.get("token") or ""

    if not token: return "", 401
    login = token_login(token) or ""

    if not login: return "", 403
    if not status: return "", 400

    cursor.execute("update users set status = ? where user_id = ?", [status[0:200], login])
    connection.commit()

    return "", 200

dynamic_route = ["/user", updateStatus]

