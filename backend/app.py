from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import dotenv_values


config = dotenv_values(".env")
app = Flask(__name__)
CORS(app)

client = MongoClient(config['MONGO_CONNECTION'])
db = client.get_database("Pinnacle")

print("Hello World")
app.config['DEBUG'] = True

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

@app.route("/add_file", methods=['POST'])
def add_file():
    '''
    adds the file type object in the file collection 
    as well as in the array of lectures  
    '''
    return


@app.route("/db/get_course_lectures", methods=['POST'])
def get_course_from_db():
    data = request.get_json()
    if not data:
        return jsonify({'error': "Could not find any course"})
    
    college =data.get('college')
    topic = data.get('topic')
    course_name = data.get('course_name')
    if not college or not topic or not course_name:
        return jsonify({'error': 'parameters missing'})

    courses_db = db.get_collection('Courses')
    query = {}
    query['college'] = college
    query['topic'] = topic
    query['course_name'] = course_name
    result = courses_db.find_one(query)
    res = []
    # print(result)
    if not result:
        return jsonify({'error': 'no such '})    
    
    for value in result['lectures']:
        print("adding value")
        res.append([str(value[0]), str(value[1])])

    return jsonify({'success': res})
    

@app.route("/filter", methods=['POST'])
def filtered_items():

    data = request.get_json()
    if not data:
        return jsonify({'error': 0})

    college =data.get('college')
    topic = data.get('topic')
    
    query = {}
    if college:
        query['college'] = college
    if topic:
        query['topic'] = topic

    courses = db.get_collection('Courses')        
    results = courses.find(query)
    res = []
    for document in results:
        res.append({'course_name': document['course_name'], 'college': document['college'], 'topic': document['topic']})
    return jsonify({'success': res})



if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run(debug=True)
