from main import cursor
import uuid

def new_uuid():
    temp_uuid = str(uuid.uuid4())
    query = cursor.execute("select user_id from users where user_id = \"{temp_uuid}\"").fetchone()
    if query:
        return new_uuid()
    else:
        return temp_uuid

