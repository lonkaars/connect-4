from flask import Flask
app = Flask(__name__)

from status import status
from user.info import info

app.register_blueprint(status, url_prefix='/api')
app.register_blueprint(info, url_prefix='/api/user')

