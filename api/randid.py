from main import cursor
import uuid

def new_uuid():
    temp_uuid = str(uuid.uuid4())
    # check if user_id is already taken
    if cursor.execute("select user_id from users where user_id = ?", [temp_uuid]).fetchone():
        return new_uuid()
    else:
        return temp_uuid

