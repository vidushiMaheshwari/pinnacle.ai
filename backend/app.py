from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
client = MongoClient('localhost', 27017)

@app.route("/health")
def check_connectivity():
    return {"hello": "world"}


