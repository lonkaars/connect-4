from db import cursor, connection
import threading

def cleanup():
    now = int( time.time() * 1000 )
    old_games = cursor.execute("select game_id from games where (status = \"wait_for_opponent\" or status = \"in_progress\") and last_activity < ?", [now - 5 * 60 * 1e3])
    print(old_games)

def set_interval(func, sec): # https://stackoverflow.com/questions/2697039/python-equivalent-of-setinterval
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

set_interval(cleanup, 5 * 60)
