from db import cursor, connection
import hashlib
import secrets
import json
import time


# get valid token hashes for a given user_id
def valid_tokens(user_id):
	tokens = json.loads(
		cursor.execute(
			"select valid_tokens from users where user_id = ?", [user_id]
		).fetchone()[0]
	)
	# return only tokens that aren't expired
	return [
		token for token in tokens
		if token["expirationDate"] > int(time.time() * 1000)
	]


def validate_token(user_id, token):
	tokens = valid_tokens(user_id)
	return hashlib.sha256(str(token).encode()).hexdigest() in [
		t["token"] for t in tokens
		if t["expirationDate"] > int(time.time() * 1000)
	]


def modify_tokens(user_id, formatted_token, remove):
	temp_tokens = valid_tokens(user_id)
	temp_tokens.remove(formatted_token
						) if remove else temp_tokens.append(formatted_token)
	cursor.execute(
		"update users set valid_tokens = ? where user_id = ?",
		[json.dumps(temp_tokens), user_id]
	)
	connection.commit()


def add_token(user_id, formatted_token):
	modify_tokens(user_id, formatted_token, False)


def revoke_token(user_id, formatted_token):
	modify_tokens(user_id, formatted_token, True)


def hash_token(token):
	return {
		"token": hashlib.sha256(str(token["token"]).encode()).hexdigest(),
		"expirationDate": token["expirationDate"]
	}


def generate_token():
	return {
		"token": secrets.token_hex(128),
		"expirationDate": int(time.time() * 1000) + (24 * 60 * 60 * 1000)
	}
