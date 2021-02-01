# PO connect-4

<div style="text-align: center;"><img src="./banner.png"/></div>

## This is a school project using Python and SQL

Note to English spreakers: most of this project is in Dutch (commit messages, documents etc.). I'll try to maintain this after the assignment deadline because I think this is a pretty cool project, and I'll be fixing issues/merging pr's after the deadline aswell. I think the deadline is ~January 25th~ sometime in March? though I'm not sure about this.

## Things that we'd like to have working:

- Working connect 4 game
- Client-server connection with socket.io
- Account creation
- Anonymous accounts / invite links
- Safe password authentication
- Play against the computer
- Rest API that handles all of this instead of some janky solution

## Maybe:

- ~Log in with google / apple / other~
- Messages
- Follow people/add as friend
- Multiple game modes
- Game rating like on chess.com
- Different themes (minimalist or skeumorphic with realistic bouncing animation)

## Used libraries:

- [Flask](https://flask.palletsprojects.com/) for the http server and REST API
- [ReactJS](https://reactjs.org/) to create the website
- [NextJS](https://nextjs.org/) for static page routing
- [socket.io](https://socket.io/) for bidirecitonal communication during a game
- [SQLite](https://sqlite.org/index.html) for the database

An example database can be found on [Google Docs](https://docs.google.com/spreadsheets/d/1mDN9IUqRIMjr_9RmLxKybjIgVuaUadalmPEFnG-XeJg/edit?usp=sharing) along with the API endpoints, and the website prototypes can be found on [Figma](https://www.figma.com/file/rTciVQApAe6cwrH1Prl5Wn/4-op-een-rij?node-id=0%3A1)

## How to set up

0. `git clone https://github.com/lonkaars/po-4-op-een-rij`
1. Make sure you have [python](https://python.org/downloads) installed.
2. Make sure you have [nodejs](https://nodejs.org/en/download) installed.
3. Install typescript, react-scripts and yarn:
	```sh
	npm i -g typescript yarn react-scripts
	```
4. Create a new python virtual environment and install pip modules:
	```sh
	python -m venv venv
	
	# activate virtual environment (see next section)

	pip install -r requirements.txt
	```
5. Install node modules:
	```sh
	yarn
	```

## How to activate Python virtual environment

### Windows (cmd)

```
.\venv\Scripts\activate.bat
```

### Windows (powershell)

```
.\venv\Scripts\Activate.ps1
```

### Windows (git bash)

```
source venv/Scripts/activate
```

### Linux (bash/zsh/sh)

```
source venv/bin/activate
```

If you did this step correctly you should see `(venv)` prefixed to your prompt.

## How to start

In order to start this project you'll need two terminal windows to start the flask and react server seperately:

```sh
# term 1

# activate virtual environment

flask run

# term 2

yarn dev
```

## How to test API endpoints
```sh
# If you're running the standalone flask server:
curl http://localhost:5000/api/<endpoint>

# If you're running flask and react at the same time:
curl http://localhost:3000/api/<endpoint>
```

