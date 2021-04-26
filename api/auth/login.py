from flask import Blueprint, request, make_response
from db import cursor
import auth.token as token
import passwords

def login_password(user_id, password):
    passwd_hash = cursor.execute(
        "select password_hash from users where user_id = ?", [user_id]
    ).fetchone()
    if not passwd_hash: return False
    check = passwords.check_password(password, passwd_hash[0])
    return bool(check)

login = Blueprint('login', __name__)


@login.route('/login', methods=['POST'])
def index():
    data = request.get_json()

    # get form data
    email = data.get("email") or ""
    password = data.get("password") or ""

    # return malformed request if email or password is missing
    if not email or not password:
        return "", 400

    # resolve user_id from username or email
    user_id = None
    user_id = user_id or cursor.execute(
        "select user_id from users where email = ?", [email]
    ).fetchone()
    user_id = user_id or cursor.execute(
        "select user_id from users where lower(username) = lower(?)", [email]
    ).fetchone()
    if user_id == None: return "", 401

    # check the password
    valid_password = login_password(user_id[0], password)
    if not valid_password: return "", 401

    # generate a new authentication token and add it to the users valid token list
    new_token = token.generate_token()
    token.add_token(user_id[0], token.hash_token(new_token))

    # make response with the set_cookie header
    res = make_response("", 200)
    res.set_cookie(
        "token",
        new_token["token"],
        expires=int(new_token["expirationDate"] / 1000)
    )

    return res


dynamic_route = ["/auth", login]
