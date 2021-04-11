from db import cursor, connection
import threading
import time


# cleanup function that's ran every five minutes
def cleanup():
	now = int(time.time() * 1000)
	old_games = cursor.execute(
	    "select game_id from games where (status = \"wait_for_opponent\" or status = \"in_progress\") and last_activity < ?",
	    [now - 5 * 60 * 1e3]
	).fetchall()
	for game_id in old_games:
		cursor.execute("delete from games where game_id = ?", [game_id[0]])
	connection.commit()


def set_interval(
    func, sec
):  # https://stackoverflow.com/questions/2697039/python-equivalent-of-setinterval
	def func_wrapper():
		set_interval(func, sec)
		func()

	t = threading.Timer(sec, func_wrapper)
	t.start()
	return t


# run every five minutes
set_interval(cleanup, 5 * 60)
