from flask import Blueprint, request
from db import cursor, connection
from hierarchy import auth_required
from user.info import format_user
import time


def format_user_list(user_ids, viewer=None):
    formatted_request_list = []

    for user_1_id in user_ids:
        formatted_request_list.append(format_user(user_1_id, viewer))

    return formatted_request_list


requests = Blueprint('requests', __name__)


@requests.route("/requests")
@auth_required("user")
def route(user_2_id):
    # get a list of friend requests
    request_list = cursor.execute(
        "select user_1_id from social where user_2_id = ? and type = \"outgoing\"",
        [user_2_id]
    ).fetchall()

    return {"requests": format_user_list([q[0] for q in request_list])}, 200


friends = Blueprint('friends', __name__)


@friends.route("/friends")
@auth_required("user")
def route(user_id):
    # get a list of friend requests
    request_list = cursor.execute(
        "select user_1_id, user_2_id from social where (user_1_id = ? or user_2_id = ?) and type = \"friendship\"",
        [user_id, user_id]
    ).fetchall()

    friend_id_list = [q[0] if q[1] == user_id else q[1] for q in request_list]

    return {"friends": format_user_list(friend_id_list)}, 200


blocked = Blueprint('blocked', __name__)


@blocked.route("/blocked")
@auth_required("user")
def route(user_id):
    # get a list of friend requests
    request_list = cursor.execute(
        "select user_2_id from social where user_1_id = ? and type = \"block\"",
        [user_id]
    ).fetchall()

    return {"blocked": format_user_list([q[0] for q in request_list])}, 200


dynamic_routes = [
    ["/social/list", requests], ["/social/list", friends],
    ["/social/list", blocked]
]
