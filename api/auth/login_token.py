from flask import Blueprint, request
from main import cursor
from auth.token import validate_token, hash_token

token = Blueprint('token', __name__)

@token.route('/token', methods = ['POST'])
def index():
    data = request.get_json()

    auth_token = data.get("token") or ""
    if not auth_token: return "", 400

    hashed = hash_token({ "token": auth_token, "expirationDate": 0 })
    user_id = cursor.execute("select user_id from users where valid_tokens like ?", [f"%{hashed['token']}%"]).fetchone()

    if not user_id: return "", 401

    return "", 200 if validate_token(user_id[0], auth_token) else 401
