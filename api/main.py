from flask import Flask
import sqlite3
import os

app = Flask(__name__)

db_path = os.path.abspath("database/database.db")
connection = sqlite3.connect(db_path, check_same_thread=False)
#!                                    ^^^ Dit is onveilig en goede multithreading support moet nog geïmplementeerd worden
cursor = connection.cursor()

from status import status
from user.info import info
from auth.signup import signup
from auth.login import login
from auth.login_token import token
from game.new import new_game

app.register_blueprint(status, url_prefix='/')
app.register_blueprint(info, url_prefix='/user')
app.register_blueprint(signup, url_prefix='/auth')
app.register_blueprint(login, url_prefix='/auth')
app.register_blueprint(token, url_prefix='/auth')
app.register_blueprint(new_game, url_prefix='/game')

