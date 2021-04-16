from flask import Blueprint, request, Response
from db import cursor
from hierarchy import auth_required
from os.path import exists
from codecs import decode
import valid

default_avatar = open("database/avatars/default.png", "rb").read()

avatar = Blueprint('avatar', __name__)


@avatar.route('/avatar', methods=["GET"])
@auth_required("none")
def get_avatar(token_id):
	user_id = request.args.get("id") or token_id
	if not user_id: return "", 400
	if not valid.user_id(user_id): return "", 403

	avatar_path = f"database/avatars/{user_id}.png"
	avatar = ""
	if exists(avatar_path):
		avatar = open(avatar_path, "rb").read()
	return Response(avatar or default_avatar, 200, mimetype="image/png")


#TODO: pillow image size validation (client side resize)
@avatar.route('/avatar', methods=["POST"])
@auth_required("user")
def update_avatar(user_id):
	if not request.data: return "", 400

	open(f"database/avatars/{user_id}.png", "wb") \
        .write(decode(request.data, "base64"))

	return "", 200


dynamic_route = ["/user", avatar]
