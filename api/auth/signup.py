from flask import Blueprint, request
from main import cursor, connection
from randid import new_uuid
import passwords
import time
import json

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

    user_id = new_uuid()
    password_salt = passwords.salt()
    password_hash = passwords.password_hash(password, password_salt)
    registered = int( time.time() * 1000 )

    cursor.execute("insert into users values (?, ?, ?, NULL, ?, ?, ?, NULL, FALSE, \"user\", \"{}\", NULL, \"online\") ",
            (user_id, username, email, password_salt, password_hash, registered))

    connection.commit()

    return "", 200
