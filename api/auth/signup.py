from flask import Blueprint, request, make_response
from db import cursor, connection
from randid import new_uuid
import auth.token as token
import passwords
import time
import re

def validate_username(username):
    return len(username) in range(3, 35 + 1)

def validate_email(email):
    #TODO: use node_modules/email-validator/index.js
    return len(email) > 1 and \
        "@" in email

def validate_password(password):
    passwordRegex = r"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$" # r"" = raw string
    return re.match(passwordRegex, password)

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

    if not validate_username(username) or \
       not validate_email(email) or \
       not validate_password(password):
           return {"error": "form_data_invalid"}, 403

    if cursor.execute("select username from users where username = ?", [username]).fetchone():
        return {"error": "username_taken"}, 403

    if cursor.execute("select email from users where email = ?", [email]).fetchone():
        return {"error": "email_taken"}, 403

    user_id = new_uuid("users")
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

dynamic_route = ["/auth", signup]
