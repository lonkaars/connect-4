from flask import Blueprint

status = Blueprint('status', __name__)

@status.route('/status')
def index():
    return ""

dynamic_route = ["/", status]

