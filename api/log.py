import logging

# logging module wrapper (same as db.py)
VERBOSE = logging.INFO
logging.basicConfig(format="[ %(levelname)s ]: %(message)s", level=VERBOSE)

# log functions
error = logging.error
info = logging.info
warning = logging.warning

