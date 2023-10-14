from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)
print("Hello World")
client = MongoClient('localhost', 27017)

@app.route("/health")
def check_connectivity():
    return {"hello": "world"}

@app.route("/bot/user_chat", methods=['POST'])
def user_input_to_bot():
    '''
    expects a json input and give
    '''
    data = request.get_json()

    if data:
        value = data.get('value')
        lectureId = data.get('lectureId')

        #TODO: send this to GPT API and then get value in res
        res = "output from GPT"
        return jsonify({'message': res})
    else:
        return jsonify({'error': 'No data received'})

if __name__ == "__main__":
    app.run(debug=True)
