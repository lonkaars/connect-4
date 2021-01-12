from flask import Blueprint

info = Blueprint('info', __name__)

@info.route('/info')
def index():
    return "user info :tada:"
