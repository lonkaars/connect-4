import logging

VERBOSE = logging.INFO
logging.basicConfig(format="[ %(levelname)s ]: %(message)s", level=VERBOSE)

error = logging.error
info = logging.info
warning = logging.warning
