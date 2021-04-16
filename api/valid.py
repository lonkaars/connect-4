from db import cursor


def validate(id, type):
    types = {
        "user": ["user_id", "users"],
        "game": ["game_id", "games"],
    }
    fields = types[type]
    query = cursor.execute(
        f"select {fields[0]} from {fields[1]} where {fields[0]} = ?", [id]
    ).fetchone()
    return bool(query)


def user_id(user_id):
    return validate(user_id, "user")


def game_id(game_id):
    return validate(game_id, "game")
