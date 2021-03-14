from flask import Blueprint, request
from db import cursor
from auth.login_token import token_login
import json

def valid_user_id(user_id):
    query = cursor.execute("select user_id from users where user_id = ?", [user_id]).fetchone()
    return bool(query)

def get_relation_to(user_1_id, user_2_id):
    relation = cursor.execute("select * from social where " + \
            "(user_1_id = ? and user_2_id = ?) or " + \
            "(user_1_id = ? and user_2_id = ?)", [user_1_id, user_2_id, user_2_id, user_1_id]).fetchone()
    if not relation: return "none"
    if relation[2] == "friendship": return "friends"
    if relation[2] == "outgoing" and relation[0] == user_1_id: return "outgoing"
    if relation[2] == "outgoing" and relation[1] == user_1_id: return "incoming"
    if relation[2] == "block" and relation[0] == user_1_id: return "blocked"
    return "none"

def count_friends(user_id):
    query = cursor.execute("select type from social where (user_1_id = ? or user_2_id = ?) and type = \"friendship\"", [user_id, user_id]).fetchall()
    return len(query)

def format_user(user_id, viewer = ''):
    user = cursor.execute("select " + ", ".join([
        "username",
        "user_id",
        "country",
        "registered",
        "avatar",
        "status",
    ]) + " from users where user_id = ?", [user_id]).fetchone()
    formatted_user = {
        "username": user[0],
        "id": user[1],
        "country": user[2],
        "registered": user[3],
        "avatar": user[4],
        "status": user[5],
        "friends": count_friends(user_id)
    }
    if viewer:
        formatted_user["relation"] = get_relation_to(viewer, user_id)
    return formatted_user

info = Blueprint('info', __name__)

@info.route('/info', methods = ['GET', 'POST'])
def index():
    data_string = request.data or "{}"
    data = json.loads(data_string)

    username = data.get("username") or ""
    user_id = data.get("id") or ""
    token = request.cookies.get("token") or ""
    viewer = ""

    if not username and \
       not user_id and \
       not token:
           return "", 400

    if username:
        temp_user_id = cursor.execute("select user_id from users where username = ?", [username]).fetchone()
        if len(temp_user_id) > 0: user_id = temp_user_id

    if token:
        self_id = token_login(token)
        if not (username or user_id):
            user_id = self_id
        if user_id:
            viewer = self_id

    if user_id and not valid_user_id(user_id): return "", 403
    user = format_user(user_id, viewer)

    #TODO: rating uitrekenen zodra er game functionaliteit is
    return user, 200

dynamic_route = ["/user", info]
