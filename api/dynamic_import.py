from app import app
from flask import url_for
import importlib
import os
import log
import glob

files = glob.glob(os.path.dirname(__file__) + "/**/*.py", recursive=True)
files.remove(__file__)
files = [str(filename)
        .replace(os.path.dirname(__file__) + "/", '')
        .replace("/", ".")
        .replace(".py", '')
        for filename in files]

for file in files:
    mod = importlib.import_module(file)
    if not hasattr(mod, "dynamic_route"): continue
    app.register_blueprint(mod.dynamic_route[1], url_prefix=mod.dynamic_route[0])
    path = (mod.dynamic_route[0] + "/" + mod.dynamic_route[1].name).replace('//', '/')
    log.info(f"dynamically routing {path}")

