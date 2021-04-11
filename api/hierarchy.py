from flask import request
from auth.login_token import token_login
from db import cursor

ranks = ["none", "user", "moderator", "admin", "bot"]


# @auth_required function decorator (use after @flask.Blueprint.route() decorator)
def auth_required(level):
	def decorator(func):
		def wrapper():
			token = request.cookies.get("token") or ""
			if not token: return "", 403

			user_id = token_login(token)
			if not user_id: return "", 403

			user_rank_text = cursor.execute(
				"select type from users where user_id = ?", [user_id]
			).fetchone()[0]

			required_rank = ranks.index(level)
			user_rank = ranks.index(user_rank_text)
			if required_rank > user_rank: return "", 403

			return func(user_id)

		wrapper.__name__ = func.__name__
		return wrapper

	return decorator
