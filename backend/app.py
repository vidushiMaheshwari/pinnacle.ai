from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import dotenv_values
import gridfs 
import pdfplumber
from werkzeug.utils import secure_filename 
import os




config = dotenv_values(".env")
app = Flask(__name__)
CORS(app)

client = MongoClient(config['MONGO_CONNECTION'])
db = client.get_database("Pinnacle")

# IMPORTS FOR ADDING FILE
fs = gridfs.GridFS(db)

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

    print(query)
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
        
        return jsonify({"message": "Data stored successfully"}), 200
        
        
        
        
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
