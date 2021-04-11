from flask import Blueprint, request, Response
from db import cursor
from auth.login_token import token_login
from user.info import valid_user_id
from hierarchy import auth_required
from os.path import exists
from codecs import decode

default_avatar = open("database/avatars/default.png", "rb").read()

avatar = Blueprint('avatar', __name__)


@avatar.route('/avatar', methods=["GET"])
def get_avatar():
	token = request.cookies.get("token") or ""
	login = token_login(token) or ""

	user_id = request.args.get("id") or login
	if not user_id: return "", 400
	if not valid_user_id(user_id): return "", 403

	avatar_path = f"database/avatars/{user_id}.png"
	avatar = ""
	if exists(avatar_path):
		avatar = open(avatar_path, "rb").read()
	return Response(avatar or default_avatar, 200, mimetype="image/png")


@avatar.route(
	'/avatar', methods=["POST"]
)  #TODO: pillow image size validation (client side resize)
@auth_required("user")
def update_avatar(login):
	if not request.data: return "", 400

	open(f"database/avatars/{login}.png",
			"wb").write(decode(request.data, "base64"))

	return "", 200


dynamic_route = ["/user", avatar]
