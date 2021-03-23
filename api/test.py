from flask import Blueprint
from hierarchy import auth_required

test = Blueprint('test_endpoint', __name__)

@test.route('/test')
@auth_required("user")
def index():
    return "Hello World!"

dynamic_route = ["/", test]

