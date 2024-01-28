from db.database import fetch_profiles
from recommender.recommender import process_profiles, recommend_for_user
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/getConnections', methods=['POST'])
def get_connections():
  data = request.json
  user_id = data.get('user_id')  # or however you're getting the user index
  top_n = data.get('top_n', 5)

  # Fetch relevant profiles from DB
  profiles = fetch_profiles(user_id)
  
  # Process the profiles and generate recommendations
  df, similarity_df = process_profiles(profiles)
  user_indices = recommend_for_user(df,similarity_df, user_id, top_n)
  
  return jsonify(user_indices)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)