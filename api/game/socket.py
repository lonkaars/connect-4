from flask import Blueprint, request, make_response
from flask_socketio import SocketIO, emit, disconnect, Namespace, emit
import time
import json

class GameSocketNamespace(Namespace):
    def connect(self):
        print("new connection")
        emit("gert", {"gert": "banaan"})

    def on_connect(self):
        print("new connection")
        emit("gert", {"gert": "banaan"})

    def on_disconnect(self):
        print("disconnect")

    def new_move(self, data):
        print("new_move")
        print(data)

    def resign(self, data):
        print("resign")
        print(data)

def run(app):
    socketio = SocketIO(app)
    socketio.on_namespace(GameSocketNamespace("/game/socket"))
    socketio.run(app, host="127.0.0.1", port=5000, debug=True)

