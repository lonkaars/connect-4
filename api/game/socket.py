from flask import Blueprint, request, make_response
from flask_socketio import SocketIO, emit, disconnect
from main import socketio
import time
import json

@socketio.on("connect", namespace="/game/socket")
def connect():
    print("connected")

