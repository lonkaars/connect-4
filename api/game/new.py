import time
from db import cursor, connection
from socket_io import io
from randid import new_uuid
from game.socket import games, game

def create_game(user_1_id, private = False, user_2_id = None):
    timestamp = int( time.time() * 1000 )

    game_id = new_uuid("games")

    cursor.execute("insert into games values (?, NULL, \"\", ?, ?, NULL, ?, NULL, ?, NULL, NULL, NULL, \"wait_for_opponent\", \"default\", ?, FALSE) ", (game_id, user_1_id, user_2_id, timestamp, timestamp, private))
    connection.commit()

    return game_id

def start_game(game_id, user_2_id):
    timestamp = int( time.time() * 1000 )

    db_game = cursor.execute("select player_2_id, status, private from games where game_id = ?", [game_id]).fetchone()
    if db_game[1] != "wait_for_opponent": return False

    if db_game[0] == None: cursor.execute("update games set player_2_id = ? where game_id = ?", (user_2_id, game_id))
    cursor.execute("update games set status = \"in_progress\", started = ?, last_activity = ? where game_id = ?", (timestamp, timestamp, game_id))
    connection.commit()

    players = cursor.execute("select player_1_id, player_2_id from games where game_id = ?", [game_id]).fetchone()
    games[game_id] = game(game_id, io, players[0], players[1])

    io.emit("gameStart", room=games[game_id].room)


