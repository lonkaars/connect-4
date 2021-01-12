from flask import Flask

app = Flask(__name__)

@app.route("/test")
def testroute():
    return "It's working!"

