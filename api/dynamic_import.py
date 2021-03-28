from app import app
from flask import url_for
import importlib
import os
import log
import glob

# get all python files in api/ directory and convert them to python import names
files = glob.glob(os.path.dirname(__file__) + "/**/*.py", recursive=True)
files.remove(__file__)
files = [str(filename)
        .replace(os.path.dirname(__file__) + "/", '')
        .replace("/", ".")
        .replace(".py", '')
        for filename in files]

def route(dynamic_route):
    app.register_blueprint(dynamic_route[1], url_prefix=dynamic_route[0])
    path = (dynamic_route[0] + "/" + dynamic_route[1].name).replace('//', '/')
    log.info(f"dynamically routing {path}")

for file in files:
    mod = importlib.import_module(file)
    # check if module has `dynamic_route` defined (single route)
    if hasattr(mod, "dynamic_route"):
        route(mod.dynamic_route)
    # check if module has `dynamic_routes` defined (multiple routes as list)
    elif hasattr(mod, "dynamic_routes"):
        for dynamic_route in mod.dynamic_routes:
            route(dynamic_route)

