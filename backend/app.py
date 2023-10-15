from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import dotenv_values
from model import AI_Model




from livetranscription import liveTranscription

import gridfs 
import pdfplumber
from werkzeug.utils import secure_filename 
import model
from bson.objectid import ObjectId
import os


config = dotenv_values(".env")
app = Flask(__name__)
CORS(app)
AI_MODEL = model.AI_Model("ytve", temperature=0.6)

client = MongoClient(config['MONGO_CONNECTION'])
db = client.get_database("Pinnacle")

# IMPORTS FOR ADDING FILE
fs = gridfs.GridFS(db)

print("Hello World")
app.config['DEBUG'] = True

@app.route("/health")
def check_connectivity():
    return {"hello": "world"}

@app.route("/model_live", methods=['POST'])
def live_answering():
    data = request.get_json()
    # print(data)
    if not data:
        return jsonify({'error': 'No data received'})
    userinput = data.get('userinput')
    file_contents = ""
    with open("my_text_file.txt", "r") as file:
        file_contents = file.read()
    # print(file_contents)
    live_instance = model.AI_Model(file_contents, temperature=0.6)
    res = live_instance.answer_question(userinput)
    print('Vibhav')
    print(res)
    return jsonify({'message': res})

@app.route("/bot/user_chat", methods=['POST'])
def user_input_to_bot():
    data = request.get_json()

    print('data')
    print(data)
    if not data:
        return jsonify({'error': 'No data received'})
    userinput = data.get('userinput')

        # lectureId = data.get('lectureId')
    # print("new history")
    # print(AI_MODEL.chat_history)
    res = AI_MODEL.answer_question(userinput)
    return jsonify({'message': res})
        


@app.route("/model/create_model_from_text", methods=['POST'])
def get_model_from_text():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'missing data'})
    lecture_id = data.get('lecture_id')
    lectures = db.get_collection('Lectures')
    document = lectures.find_one({"_id": ObjectId(lecture_id)})
    if not document:
        return jsonify({'error': 'no such lecture exist'})

    lecture_text = document['lecture_text']
    global AI_MODEL
    AI_MODEL = model.AI_Model(lecture_text, temperature=0.6)
    res = AI_MODEL.answer_question("what are collisions")
    # print(AI_MODEL.chat_history)
    # print(("ress", res))
    return jsonify({'success': 'finished'})

# @app.route('')
# def get_ai_notes()

@app.route("/start-recording", methods=['POST'])
async def start_recording():
    print("reached ")
    data = request.get_json()
    if data:
        videoID = data.get('lectureId')
        print('what dgood')
        instance =  liveTranscription()
        await instance.main()
        print('done live')
        return jsonify({'message': "eveyrthing works fine"})
    else:
        return jsonify({'error': 'No data received'})


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

@app.route("/add-file", methods=['POST'])
def add_lecture():
    try:
        course_name = request.form.get('course_name')
        college_name = request.form.get('college_name')
        topic_name = request.form.get('topic_name')
        lecture_name = request.form.get('lecture_name')
        
        print(request.files)
        
        if 'lecture' not in request.files:
            return jsonify({"message": "No file part"}), 400
        lecture = request.files['lecture']

        
        if lecture.filename == '':
            return jsonify({"message": "No selected file"}), 400
        
        with pdfplumber.open(lecture) as pdf:
            text_content = []
            for page in pdf.pages:
                text_content.append(page.extract_text())
            lecture_text = "\n".join(text_content)
       
        lecture_id = fs.put(lecture, filename=secure_filename(lecture.filename), content_type=lecture.content_type)     
        
        # Inserting lecture data
        lecture_entry = {
            'lecture_name': lecture_name,
            'notes': lecture_id,
            'lecture_text': lecture_text
        }
        lecture_insert_result = db.Lectures.insert_one(lecture_entry)
        
        db.Courses.update_one(
            {'course_name': course_name, 'college': college_name, 'topic': topic_name},
            {
                '$addToSet': {'lectures': [lecture_insert_result.inserted_id,lecture_name]},
                '$setOnInsert': {'course_name': course_name, 'college': college_name, 'topic': topic_name},
            },
            upsert=True
        )
        
        return jsonify({"message": "Data stored successfully Vidushi"}), 200
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({"message": "An error occurred while processing the form data"}), 500
        
    
    
    # check format of data
    # null check return error
    # get table db.get(Coursces)
    return jsonify("SUCCESS")

    
    
    

if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run(debug=True)
