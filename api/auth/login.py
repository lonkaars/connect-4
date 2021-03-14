from flask import Blueprint, request, make_response
from db import cursor
import auth.token as token
import passwords

login = Blueprint('login', __name__)

@login.route('/login', methods = ['POST'])
def index():
    data = request.get_json()

    email = data.get("email") or ""
    password = data.get("password") or ""

    if not email or \
       not password:
           return "", 400

    user_id = None
    user_id = user_id or cursor.execute("select user_id from users where email = ?", [email]).fetchone()
    user_id = user_id or cursor.execute("select user_id from users where lower(username) = lower(?)", [email]).fetchone()
    if user_id == None: return "", 401

    passwd = cursor.execute("select password_hash from users where user_id = ?", [user_id[0]]).fetchone()
    check = passwords.check_password(password, passwd[0])
    if not check: return "", 401

    new_token = token.generate_token()
    token.add_token(user_id[0], token.hash_token(new_token))

    res = make_response("", 200)
    res.set_cookie("token", new_token["token"], expires = int(new_token["expirationDate"] / 1000))

    return res

dynamic_route = ["/auth", login]
