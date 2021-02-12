from flask import Blueprint, request, make_response
from main import cursor, connection
from randid import new_uuid
import auth.token as token
import passwords
import time

signup = Blueprint('signup', __name__)

@signup.route('/signup', methods = ['POST'])
def index():
    data = request.get_json()

    username = data.get("username") or ""
    email = data.get("email") or ""
    password = data.get("password") or ""

    if not username or \
       not email or \
       not password:
           return "", 400

    if cursor.execute("select username from users where username = ?", [username]).fetchone():
        return {"error": "username_taken"}, 403

    if cursor.execute("select email from users where email = ?", [email]).fetchone():
        return {"error": "email_taken"}, 403

    user_id = new_uuid()
    password_hash = passwords.password_hash(password)
    registered = int( time.time() * 1000 )

    cursor.execute("insert into users values (?, ?, ?, NULL, NULL, ?, ?, \"[]\", FALSE, \"user\", \"{}\", NULL, \"online\") ",
            (user_id, username, email, password_hash, registered))
    connection.commit()

    new_token = token.generate_token()
    token.add_token(user_id, token.hash_token(new_token))

    res = make_response("", 200)
    res.set_cookie("token", new_token["token"], expires = int(new_token["expirationDate"] / 1000))

    return res
