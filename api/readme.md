# API

This is the subdirectory for the API. You can find the API reference in [this](https://docs.google.com/spreadsheets/d/1mDN9IUqRIMjr_9RmLxKybjIgVuaUadalmPEFnG-XeJg/edit?usp=sharing) Google Docs document.

## Endpoint reference (WIP)

API return type classes are mostly defined in api/api.ts

endpoint|method|description|parameters|authorization
-|-|-|-|-
/status | GET | get online user count and active game count
/auth/login | POST | log in with email or username
/auth/token | POST | log in using a token (stored as cookie)
/auth/signup | POST | sign up
/user/info | GET\|POST | get user info by username or id  note: avatar is a uri to a 256x256 .png image
/user/games | GET\|POST | get games of user
/user/avatar | GET\|POST | fetch or update avatar note: avatar is a client-resized 256x256 .png base64-encoded image, request returns error when image is not .png or larger than 256x256
/user/prefrences | GET\|POST | fetch or change user preferences
/user/password | POST | update password
/user/email | POST | update email (token used for authentication if password is undefined)
/user/username | POST | update username (token used for authentication if password is undefined)
/user/status | POST | update status
/user/searchFriends | POST | search user's friend list
/social/request | POST | send a friend request to a user by user id
/social/accept | POST | accept a friend request
/social/remove | POST | remove a friend from your friend list or delete a friend request from a user
/social/search | POST | search for users by username or status
/social/block | POST | block a user
/social/unblock | POST | unblock a user
/social/list/requests | GET | get a list of unaccepted friend requests
/social/list/blocks | GET | get a list of blocked people
/social/list/friends | GET | get a list of your friends
/game/new | POST | create a new private game
/game/random | POST | join or create a public game
/game/info | POST | 
/game/accept | POST | accept game invite or rematch
/game/spectate | POST | spectate a game by id

## Events

These are events that are fired by the socket.io connection

event|description|data|direction|context
-|-|-|-|-
fieldUpdate|recieve new playfield from server|`{ field: string }`|`s  -> c`|game
turnUpdate|recieve if it's player 1's move|`{ player1: boolean }`|`s  -> c`|game
gameStart|sent when game starts|`none`|`s  -> c`|game
finish|sent when game finishes|`none`|`s  -> c`|game
resign|send to resign, is then forwarded to all subscribed clients|`none`|`s <-> c`|game
newMove|send a new move|`{ move: int, game_id: string }`|`s <-  c`|game
registerGameListener|listen to events for a game|`{ id: string }`|`s <-  c`|game
incomingFriendRequest|get notified of friend request|`none`|`s  -> c`|global

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

