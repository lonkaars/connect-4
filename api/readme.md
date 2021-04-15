# API

This is the subdirectory for the API. You can find the API reference in
[this](https://docs.google.com/spreadsheets/d/1mDN9IUqRIMjr_9RmLxKybjIgVuaUadalmPEFnG-XeJg/edit?usp=sharing)
Google Docs document.

## Endpoint reference (WIP)

API return type classes are mostly defined in api/api.ts

<table>
<thead>
<tr>
<th>endpoint</th>
<th>method</th>
<th>description</th>
<th>parameters</th>
<th>authorization</th>
<th>response</th>
</tr>
</thead>
<tbody>

<tr>
<td>/status</td>
<td><code>GET</code></td>
<td>get online user count and active game count</td>
<td><code>none</code></td>
<td><code>none</code></td>
<td>

```ts
{
  users: int,
  games: int
}
```

</td>
</tr>

<tr>
<td>/auth/login</td>
<td><code>POST</code></td>
<td>log in with email or username</td>
<td>

```ts
{
  email: string,
  password: string
}
```

</td>
<td><code>none</code></td>
<td>empty response with the set_cookie header</td>
</tr>

<tr>
<td>/auth/signup</td>
<td><code>POST</code></td>
<td>sign up</td>
<td>

```ts
{
  username: string,
  email: string,
  password: string
}
```

</td>
<td><code>none</code></td>
<td>empty response with the set_cookie header</td>
</tr>

<tr>
<td>/user/info</td>
<td><code>GET|POST</code></td>
<td>get user info by username or id  note: avatar is a uri to a 256x256 .png image</td>
<td>

```ts
{ id?: userID }
```

</td>
<td><code>none|user</code></td>
<td>

```ts
userInfo;
```

</td>
</tr>

<tr>
<td>/user/games</td>
<td><code>GET|POST</code></td>
<td>get games of user</td>
<td>

```ts
{ id?: userID }
```

</td>
<td><code>none|user</code></td>
<td>

```ts
{
  games: Array<gameInfo>,
  totals: userGameTotals
}
```

</td>
</tr>

<tr>
<td>/user/avatar</td>
<td><code>GET</code></td>
<td>fetch avatar as .png</td>
<td>

```ts
{ id?: userID }
```

</td>
<td><code>none|user</code></td>
<td>PNG image</td>
</tr>

<tr>
<td>/user/avatar</td>
<td><code>POST</code></td>
<td>
update avatar

note: avatar is a client-resized 256x256 .png base64-encoded image, request
returns error when image is not .png or larger than 256x256

</td>
<td>

```ts
{
	image:
	base64PNG;
}
```

</td>
<td><code>user</code></td>
<td><code>none</code></td>
</tr>

<tr>
<td>/user/prefrences</td>
<td><code>GET</code></td>
<td>fetch user preferences</td>
<td><code>none</code></td>
<td><code>user</code></td>
<td>

```ts
{
	preferences:
	userPreferences;
}
```

</td>
</tr>

<tr>
<td>/user/prefrences</td>
<td><code>POST</code></td>
<td>change user preferences</td>
<td>

```ts
{
	newPreferences:
	userPreferences;
}
```

</td>
<td><code>user</code></td>
<td><code>none</code></td>
</tr>

<tr>
<td>/user/password</td>
<td>POST</td>
<td>update password</td>
<td>

```ts
{
  password: string,
  newPassword: string,
}
```

</td>
<td><code>user</code></td>
<td><code>none</code></td>
</tr>

<tr>
<td>/user/email</td>
<td>POST</td>
<td>update email</td>
<td>

```ts
{
  password: string,
  email: string,
}
```

</td>
<td><code>user</code></td>
<td><code>none</code></td>
</tr>

<tr>
<td>/user/username</td>
<td>POST</td>
<td>update username</td>
<td>

```ts
{
  password: string,
  username: string,
}
```

</td>
<td><code>user</code></td>
<td><code>none</code></td>
</tr>

<tr>
<td>/user/status</td>
<td><code>POST</code></td>
<td>update status</td>
<td>

```ts
{
	status:
	string;
}
```

</td>
<td><code>user</code></td>
<td><code>none</code></td>
</tr>

<tr>
<td>/user/searchFriends</td>
<td><code>POST</code></td>
<td>search user's friend list</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/social/request</td>
<td><code>POST</code></td>
<td>send a friend request to a user by user id</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/social/accept</td>
<td><code>POST</code></td>
<td>accept a friend request</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/social/remove</td>
<td><code>POST</code></td>
<td>remove a friend from your friend list or delete a friend request from a user</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/social/search</td>
<td><code>POST</code></td>
<td>search for users by username or status</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/social/block</td>
<td><code>POST</code></td>
<td>block a user</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/social/unblock</td>
<td><code>POST</code></td>
<td>unblock a user</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/social/list/requests</td>
<td><code>GET</code></td>
<td>get a list of unaccepted friend requests</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/social/list/blocks</td>
<td><code>GET</code></td>
<td>get a list of blocked people</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/social/list/friends</td>
<td><code>GET</code></td>
<td>get a list of your friends</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/game/new</td>
<td><code>POST</code></td>
<td>create a new private game</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/game/random</td>
<td><code>POST</code></td>
<td>join or create a public game</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/game/info</td>
<td><code>POST</code></td>
<td></td>
<td></td>
<td></td>
</tr>

<tr>
<td>/game/accept</td>
<td><code>POST</code></td>
<td>accept game invite or rematch</td>
<td></td>
<td></td>
</tr>

<tr>
<td>/game/spectate</td>
<td><code>POST</code></td>
<td>spectate a game by id</td>
<td></td>
<td></td>
</tr>

</tbody>
</code>
</table>

## Events

These are events that are fired by the socket.io connection

<table>
<thead>

<tr>
<th>event</th>
<th>description</th>
<th>data</th>
<th>direction</th>
<th>context</th>
</tr>

</thead>
<tbody>

<tr>
<td>fieldUpdate</td>
<td>recieve new playfield from server</td>
<td><code>{ field: string }</code></td>
<td><code>s  -&gt; c</code></td>
<td>game</td>
</tr>

<tr>
<td>turnUpdate</td>
<td>recieve if it's player 1's move</td>
<td><code>{ player1: boolean }</code></td>
<td><code>s  -&gt; c</code></td>
<td>game</td>
</tr>

<tr>
<td>gameStart</td>
<td>sent when game starts</td>
<td><code>none</code></td>
<td><code>s  -&gt; c</code></td>
<td>game</td>
</tr>

<tr>
<td>finish</td>
<td>sent when game finishes</td>
<td><code>none</code></td>
<td><code>s  -&gt; c</code></td>
<td>game</td>
</tr>

<tr>
<td>resign</td>
<td>send to resign, is then forwarded to all subscribed clients</td>
<td><code>none</code></td>
<td><code>s &lt;-&gt; c</code></td>
<td>game</td>
</tr>

<tr>
<td>newMove</td>
<td>send a new move</td>
<td><code>{ move: int, game_id: string }</code></td>
<td><code>s &lt;-  c</code></td>
<td>game</td>
</tr>

<tr>
<td>registerGameListener</td>
<td>listen to events for a game</td>
<td><code>{ id: string }</code></td>
<td><code>s &lt;-  c</code></td>
<td>game</td>
</tr>

<tr>
<td>incomingFriendRequest</td>
<td>get notified of friend request</td>
<td><code>none</code></td>
<td><code>s  -&gt; c</code></td>
<td>global</td>
</tr>

<tr>
<td>changedRelation</td>
<td>get notified of a different relation to someone</td>
<td><code>{ id: string }</code></td>
<td><code>s  -&gt; c</code></td>
<td>global</td>
</tr>

</tbody>
</table>

## How to test API endpoints

```sh
# If you're running the standalone flask server:
curl http://localhost:5000/<endpoint>

# If you're running flask and nginx at the same time:
curl http://localhost:2080/api/<endpoint>
```

## How to add new API endpoints

Please follow these rules when creating new API endpoints:

1. Endpoints should always return a valid JSON object and an appropriate
   [http code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
2. Endpoints that are in a namespace should get their own directory in this
   folder, eg. http://localhost:5000/status is defined in api/status.py,
   http://localhost:5000/auth/signup is defined in api/auth/signup.py etc.
3. Endpoints that take data should verify that the data is present and valid,
   and return an empty JSON object with http code 400 (bad request) if the data
   isn't valid.
4. Endpoints that require database access should get the cursor/connection
   object from api/db.py

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
