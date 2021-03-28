from flask import Blueprint, request
from db import cursor, connection
from hierarchy import auth_required
from socket_io import io
import time

# @two_person_endpoint decorator
# defines (user_1_id, user_2_id) in endpoint handler function arguments
def two_person_endpoint(func):
    @auth_required("user")
    def wrapper(user_1_id):
        data = request.get_json()
        user_2_id = data.get("id") or ""

        if not user_1_id or \
           not user_2_id:
               return "", 403

        return func(user_1_id, user_2_id)
    wrapper.__name__ = func.__name__
    return wrapper

def create_relation(user_1_id, user_2_id, relation_type):
    remove_relation(user_1_id, user_2_id)
    remove_relation(user_2_id, user_1_id)
    timestamp = int( time.time() * 1000 )
    cursor.execute("insert into social values (?, ?, ?, ?)",
            [user_1_id, user_2_id, relation_type, timestamp])
    connection.commit()

# remove relation between user_1_id and user_2_id (one-way)
def remove_relation(user_1_id, user_2_id):
    cursor.execute("delete from social where user_1_id = ? and user_2_id = ?",
            [user_1_id, user_2_id])
    connection.commit()

def create_relation_route(relation_type):
    @two_person_endpoint
    def route(user_1_id, user_2_id):
        create_relation(user_1_id, user_2_id, relation_type)

        if relation_type == "outgoing":
            io.emit("incomingFriendRequest", room="user-"+user_2_id)

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


