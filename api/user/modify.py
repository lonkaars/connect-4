from flask import Blueprint, request
from db import cursor, connection
from hierarchy import auth_required
from auth.login import login_password


def login_and_password(func):
    @auth_required("user")
    def wrapper(user_id):
        data = request.get_json()
        if not data: return "", 400

        password = data.get("password")
        if not password: return "", 401

        if not login_password(user_id, password): return "", 401

        return func(user_id)
    return wrapper


def modify_user_info(type):
    @login_and_password
    def index(user_id):
        data = request.get_json()
        if not data: return "", 400

        new_value = data.get(type)
        if not new_value: return "", 401

        # check if already taken
        taken = cursor.execute(f"select count(user_id) from users where lower({type}) = lower(?)", [new_value]).fetchone()
        if taken[0] > 0: return "", 403

        # update
        cursor.execute(f"update users set {type} = ? where user_id = ?", [new_value, user_id])
        connection.commit()
        return "", 200
    return index


modify_username = Blueprint('modify_username', __name__)
modify_username.add_url_rule(
    '/username', 'route', modify_user_info("username"), methods=["POST"]
)

modify_email = Blueprint('modify_email', __name__)
modify_email.add_url_rule(
    '/email', 'route', modify_user_info("email"), methods=["POST"]
)


dynamic_routes = [
        ["/user", modify_username],
        ["/user", modify_email]
        ]
