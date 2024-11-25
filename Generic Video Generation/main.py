from flask import  Flask , request , jsonify
from moving_caption import entryFunction
from flask_cors import CORS
app = Flask(__name__)

CORS(app) 


# API route
@app.route('/create-video', methods=['POST'])
def process():
    data = request.json  # Get JSON payload
    if not data or 'topic' not in data:
        return jsonify({"error": "Missing 'topic' field"}), 400
    
    topic = data['topic']
    result = entryFunction(topic)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

