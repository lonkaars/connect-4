from flask import Blueprint, request, make_response
from db import cursor, connection
from randid import new_uuid
import auth.token as token
import passwords
import time
import re


# checks if the usename is between 3 and 35 charachters
def validate_username(username):
    return len(username) in range(3, 35 + 1)


# garbage email validation (see todo)
def validate_email(email):
    #TODO: use node_modules/email-validator/index.js
    return len(email) > 1 and \
                                         "@" in email


# checks if the password is safe (regex explanation in pages/register.tsx)
def validate_password(password):
    passwordRegex = r"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$"  # r"" = raw string
    return re.match(passwordRegex, password)


signup = Blueprint('signup', __name__)


@signup.route('/signup', methods=['POST'])
def index():
    # parse request data if the content-type header is set to application/json
    data = request.get_json()

    # force string if {}.get(...) returns None
    username = data.get("username") or ""
    email = data.get("email") or ""
    password = data.get("password") or ""

    # return 400 (malformed request) if any of the required data is missing
    if not username or \
                                        not email or \
                                        not password:
        return "", 400

    # return 403 (forbidden) if any of the required data is invalid
    if not validate_username(username) or \
                                        not validate_email(email) or \
                                        not validate_password(password):
        return {"error": "form_data_invalid"}, 403

    # check if username is taken
    if cursor.execute(
        "select username from users where lower(username) = lower(?)",
        [username]
    ).fetchone():
        return {"error": "username_taken"}, 403

    # check if email is taken
    if cursor.execute("select email from users where email = ?",
                      [email]).fetchone():
        return {"error": "email_taken"}, 403

    # create new user_id, hash password and note timestamp
    user_id = new_uuid("users")
    password_hash = passwords.password_hash(password)
    registered = int(time.time() * 1000)

    # write new user to database and commit
    cursor.execute(
        "insert into users values (?, ?, ?, NULL, NULL, ?, ?, \"[]\", FALSE, \"user\", \"{}\", \"online\") ",
        (user_id, username, email, password_hash, registered)
    )
    connection.commit()

    # create a new token for the user to use for authentication
    new_token = token.generate_token()
    token.add_token(user_id, token.hash_token(new_token))

    # create a flask response object to add the set-cookie header to
    res = make_response("", 200)
    res.set_cookie(
        "token",
        new_token["token"],
        expires=int(new_token["expirationDate"] / 1000)
    )

    return res


dynamic_route = ["/auth", signup]
