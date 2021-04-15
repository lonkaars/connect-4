from flask import request
from auth.login_token import token_login
from db import cursor
from util import all_def, all_notdef
import valid

ranks = ["none", "user", "moderator", "admin", "bot"]


def util_two_person(func):
	'''
	! only used internally !
	func(token_id?: str, explicit_id?: str)

	This decorator doesn't check for hierarchy constraints, but does
	make sure that token_id or explicit_id are valid user_id's
	'''
	def wrapper():
		token_id = None
		explicit_id = None

		token = request.cookies.get("token") or ""
		if token: token_id = token_login(token)

		data = request.get_json()
		if data: explicit_id = data.get("id")

		if explicit_id and not valid.user_id(explicit_id): explicit_id = None

		return func(token_id, explicit_id)

	wrapper.__name__ = func.__name__
	return wrapper


def two_person(func):
	'''
	endpoint should have two parameters:
	endpoint(user_1_id: str, user_2_id: str)

	no authentication, just runs endpoint() if both token_id and
	explicit_id are present from @util_two_person.
	'''
	@util_two_person
	def wrapper(token_id, explicit_id):
		if not all_def([token_id, explicit_id]):
			return "", 400

		return func(token_id, explicit_id)

	wrapper.__name__ = func.__name__
	return wrapper


def one_person(func):
	'''
	endpoint should have two parameters:
	endpoint(user_id: str, viewer?: str)

	uses json data id with token_login id as fallback
	doesn't check for authentication
	expects that func takes these arguments: (user_id, viewer?)
	'''
	@util_two_person
	def wrapper(token_id, explicit_id):
		if all_notdef([token_id, explicit_id]):
			return "", 400

		return func(explicit_id or token_id, token_id)

	wrapper.__name__ = func.__name__
	return wrapper


def auth_required(level):
	'''
	level = "none" | "user" | "moderator" | "admin" | "bot"
	endpoint should have one parameter for the user_id of the request author:
	endpoint(user_id: str) # `user_id` can only be `None` when `level == "none"`

	@auth_required function decorator (use after @flask.Blueprint.route() decorator)
	This decorator only runs endpoint() if token_id from
	@util_two_person is not None and passes hierarchy constraints
	'''
	def decorator(func):
		@util_two_person
		def wrapper(token_id, explicit_id):
			if not token_id:
				if level == ranks[0]:
					return func(None)
				else:
					return "", 400

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
