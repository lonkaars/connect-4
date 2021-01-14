from flask import Blueprint, request
from main import cursor
from auth.token import validate_token

token = Blueprint('token', __name__)

@token.route('/token', methods = ['POST'])
def index():
    data = request.get_json()

    user_id = data.get("user_id") or ""
    auth_token = data.get("token") or ""

    if not user_id or \
       not auth_token:
           return "", 400
    
    if not cursor.execute("select user_id from users where user_id = ?", [user_id]).fetchone():
        return "", 401

    return "", 200 if validate_token(user_id, auth_token) else 401
