from flask import Blueprint, request
from db import cursor
from auth.token import validate_token, hash_token

def token_login(token):
    hashed = hash_token({ "token": token, "expirationDate": 0 })
    user_id = cursor.execute("select user_id from users where valid_tokens like ?", [f"%{hashed['token']}%"]).fetchone()
    return None if not user_id else user_id[0]

token = Blueprint('token', __name__)

@token.route('/token', methods = ['POST'])
def index():
    data = request.get_json()

    auth_token = data.get("token") or ""
    if not auth_token: return "", 400

    return "", 200 if token_login(auth_token) else 401

dynamic_route = ["/auth", token]
