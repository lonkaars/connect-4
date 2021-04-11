from db import cursor
import uuid

tables = {"users": "user_id", "games": "game_id"}


# generate a new uuid and check for collisions (unlikely but still)
def new_uuid(table_name):
	temp_uuid = str(uuid.uuid4())
	column_name = tables[table_name]
	# check if id is already taken
	if cursor.execute(
		f"select {column_name} from {table_name} where {column_name} = ?",
		[temp_uuid]
	).fetchone():
		return new_uuid(table_name)
	else:
		return temp_uuid
