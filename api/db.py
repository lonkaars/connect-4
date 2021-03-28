import os
import sqlite3

# open database
db_path = os.path.abspath("database/database.db")
connection = sqlite3.connect(db_path, check_same_thread=False)
#!                                    ^^^ Dit is onveilig en goede multithreading support moet nog geïmplementeerd worden

# load the sql extension used in social/search
connection.enable_load_extension(True)
connection.load_extension("./database/levenshtein.sqlext")

# sql cursor
cursor = connection.cursor()

