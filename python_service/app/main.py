from db.database import fetch_profiles
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/hello', methods=['GET'])
def process_data():
  return 'Hello'


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)