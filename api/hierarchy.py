from flask import request
from auth.login_token import token_login
from db import cursor
from util import all_def, all_notdef
import valid

ranks = ["none", "user", "moderator", "admin", "bot"]


def util_two_id(type="user"):
	'''
	type?: "user" | "game"
	! only used internally !
	func(token_id?: str, explicit_id?: str)

	This decorator doesn't check for hierarchy constraints, but does
	make sure that token_id or explicit_id are valid user_id's
	'''
	def decorator(func):
		def wrapper():
			token_id = None
			explicit_id = None

			token = request.cookies.get("token") or ""
			if token: token_id = token_login(token)

			data = request.get_json()
			if data: explicit_id = data.get("id")

			# if there's an explicit_id, validate it using `type`
			if explicit_id and \
               not valid.validate(explicit_id, type):
				explicit_id = None

			return func(token_id, explicit_id)

		wrapper.__name__ = func.__name__
		return wrapper

	return decorator


def two_person(func):
	'''
	endpoint should have two parameters:
	endpoint(user_1_id: str, user_2_id: str)

	no authentication, just runs endpoint() if both token_id and
	explicit_id are present from @util_two_id.
	'''
	@util_two_id("user")
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
	@util_two_id("user")
	def wrapper(token_id, explicit_id):
		if all_notdef([token_id, explicit_id]):
			return "", 400

		return func(explicit_id or token_id, token_id)

	wrapper.__name__ = func.__name__
	return wrapper


def game_id_with_viewer(func):
	'''
	endpoint should have two parameters:
	endpoint(game_id: str, viewer?: str)
	'''
	@util_two_id("game")
	def wrapper(token_id, game_id):
		if all_notdef([token_id, game_id]):
			return "", 400

		return func(game_id, token_id)

	wrapper.__name__ = func.__name__
	return wrapper


def auth_required(level):
	'''
	level = "none" | "user" | "moderator" | "admin" | "bot"
	endpoint should have one parameter for the user_id of the request author:
	endpoint(user_id: str) # `user_id` can only be `None` when `level == "none"`

	@auth_required function decorator (use after @flask.Blueprint.route() decorator)
	This decorator only runs endpoint() if token_id from
	@util_two_id is not None and passes hierarchy constraints
	'''
	def decorator(func):
		@util_two_id("user")
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


def io_auth_required(level):
	'''
	level = "none" | "user" | "moderator" | "admin" | "bot"
	endpoint should have two parameters:
	endpoint(data: socket.io.data, user_id: str) # `user_id` can only be `None` when `level == "none"`

	uses the @auth_required decorator, but is only for use with
	@io.on decorators
	'''
	def decorator(func):
		# data is the original @io.on data
		def wrapper(data={}):

			token = request.cookies.get("token") or ""
			user_id = token_login(token)

			if not user_id:
				if level == ranks[0]:
					return func(data, None)
				else:
					return

			return func(data, user_id)

		wrapper.__name__ = func.__name__
		return wrapper

	return decorator
