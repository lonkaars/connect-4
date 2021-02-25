# API

This is the subdirectory for the API. You can find the API reference in [this](https://docs.google.com/spreadsheets/d/1mDN9IUqRIMjr_9RmLxKybjIgVuaUadalmPEFnG-XeJg/edit?usp=sharing) Google Docs document.

## How to test API endpoints
```sh
# If you're running the standalone flask server:
curl http://localhost:5000/<endpoint>

# If you're running flask and nginx at the same time:
curl http://localhost:2080/api/<endpoint>
```

## How to add new API endpoints

Please follow these rules when creating new API endpoints:

1. Endpoints should always return a valid JSON object and an appropriate [http code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
2. Endpoints that are in a namespace should get their own directory in this folder, eg. http://localhost:5000/status is defined in api/status.py, http://localhost:5000/auth/signup is defined in api/auth/signup.py etc.
3. Endpoints that take data should verify that the data is present and valid, and return an empty JSON object with http code 400 (bad request) if the data isn't valid.
4. Endpoints that require database access should get the cursor/connection object from api/db.py

## Example endpoint

Here's a simple endpoint that returns an empty JSON object:

```py
# api/tests/example.py
from flask import Blueprint

example = Blueprint('example', __name__)

@example.route('/example')
def index():
	# python dictionaries are automatically converted to JSON by flask
    return {"hello": "world"}, 200 # flask returns http code 200 by default if no code is explicitly defined

# define a `dynamic_route` variable at the end of your endpoint definition file
# dynamic_route[0] is the namespace
# dynamic_route[1] is your flask.Blueprint
dynamic_route = ["/tests", status]

# this endpoint will be routed to /tests/example
#                                  \___/ \_____/
#                                    |      |
#                                    |      endpoint (defined by the @Blueprint.route() decorator)
#                                    |
#                                    namespace (defined in dynamic_route variable)
```

