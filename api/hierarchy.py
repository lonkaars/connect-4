from flask import request
from auth.login_token import token_login
from user.info import valid_user_id
from db import cursor

ranks = ["none", "user", "moderator", "admin", "bot"]


# This decorator doesn't check for hierarchy constraints, but does
# make sure that token_id or explicit_id are valid user_id's
def util_two_person(func):
	def wrapper():
		token_id = None
		explicit_id = None

		token = request.cookies.get("token") or ""
		if token: token_id = token_login(token)

		data = request.get_json()
		if data: explicit_id = data.get("id")

		if explicit_id and not valid_user_id(explicit_id): explicit_id = None

		return func(token_id, explicit_id)

	wrapper.__name__ = func.__name__
	return wrapper


# no authentication, just runs endpoint() if both token_id and
# explicit_id are present from @util_two_person.
def two_person(func):
	@util_two_person
	def wrapper(token_id, explicit_id):
		if not token_id or \
           not explicit_id:
			return "", 400

		return func(token_id, explicit_id)

	wrapper.__name__ = func.__name__
	return wrapper


# @auth_required function decorator (use after @flask.Blueprint.route() decorator)
# This decorator only runs endpoint() if token_id from
# @util_two_person is not None and passes hierarchy constraints
def auth_required(level):
	def decorator(func):
		@util_two_person
		def wrapper(token_id, explicit_id):
			if not token_id: return "", 400

			user_rank_text = cursor.execute(
				"select type from users where user_id = ?", [token_id]
			).fetchone()[0]

			required_rank = ranks.index(level)
			user_rank = ranks.index(user_rank_text)
			if required_rank > user_rank: return "", 403

			return func(token_id)

		wrapper.__name__ = func.__name__
		return wrapper

	return decorator
