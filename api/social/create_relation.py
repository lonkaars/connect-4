from flask import Blueprint, request
from db import cursor, connection
from auth.login_token import token_login
import time

def create_relation(user_1_id, user_2_id, relation_type):
    remove_relation(user_1_id, user_2_id)
    remove_relation(user_2_id, user_1_id)
    timestamp = int( time.time() * 1000 )
    cursor.execute("insert into social values (?, ?, ?, ?)",
            [user_1_id, user_2_id, relation_type, timestamp])
    connection.commit()

def remove_relation(user_1_id, user_2_id):
    cursor.execute("delete from social where user_1_id = ? and user_2_id = ?",
            [user_1_id, user_2_id])
    connection.commit()

def create_relation_route(relation_type):
    def route():
        data = request.get_json()

        user_2_id = data.get("id") or ""
        token = request.cookies.get("token") or ""

        if not token: return "", 401
        user_1_id = token_login(token) or ""

        if not user_1_id or \
           not user_2_id:
               return "", 403

        create_relation(user_1_id, user_2_id, relation_type)
        return "", 200
    return route


friend_request = Blueprint('friend_request', __name__)
friend_request.add_url_rule('/request', 'route', create_relation_route("outgoing"), methods = ["POST"])

block = Blueprint('block', __name__)
block.add_url_rule('/block', 'route', create_relation_route("block"), methods = ["POST"])

dynamic_routes = [
        ["/social", friend_request],
        ["/social", block]
        ]


