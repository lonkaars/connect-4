import logging
from dotenv import load_dotenv
from os import environ

load_dotenv()

# logging module wrapper (same as db.py)
log_level = [None, logging.ERROR, logging.WARNING,
             logging.INFO][int(environ["CONNECT4_LOG_LEVEL"])]

logging.basicConfig(format="[ %(levelname)s ]: %(message)s", level=log_level)

# log functions
error = logging.error
info = logging.info
warning = logging.warning
