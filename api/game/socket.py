from flask import Blueprint, request, make_response
from flask_socketio import SocketIO, emit, disconnect, Namespace
from main import socketio
import time
import json

class GameSocketNamespace(Namespace):
    def connect(self):
        print("connection")

socketio.on_namespace(GameSocketNamespace("/game/socket"))

