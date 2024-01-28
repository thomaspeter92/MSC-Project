import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import MultiLabelBinarizer
import sys


# This function adjusts the similarity based on the weighting given to the likes/dislikes
def custom_similarity(features, likes_length, dislikes_length):
  n = features.shape[0]
  similarity_matrix = np.zeros((n, n))

  for i in range(n):
    for j in range(n):
      if i != j:
        # Indices for likes and dislikes
        likes_i = features[i, :likes_length]
        dislikes_i = features[i, likes_length:likes_length + dislikes_length]
        likes_j = features[j, :likes_length]
        dislikes_j = features[j, likes_length:likes_length + dislikes_length]

        # Positive contribution (standard cosine similarity)
        positive_similarity = cosine_similarity([features[i]], [features[j]])[0, 0]

        # Negative contribution (conflicting likes and dislikes)
        negative_similarity = np.sum((likes_i * dislikes_j) + (dislikes_i * likes_j))

        # Subtracting the negative contribution from the positive
        similarity_matrix[i, j] = positive_similarity - negative_similarity

  return similarity_matrix


def recommend_for_user(df, similarity_df, user_index, top_n=5):
  print(f'USER ID: {user_index}', file=sys.stdout)

  # Get similarity scores for the user
  user_similarity_scores = similarity_df.loc[user_index]
    
  # Sort the scores and fetch top N indices
  top_users_indices = user_similarity_scores.sort_values(ascending=False).index[1:top_n+1]
  print(top_users_indices)

  # Fetch the top recommended users/items
  recommended_users = df.loc[top_users_indices]
  recommended_user_ids = recommended_users.index.tolist()  # Assuming 'user_id' is the column name
  return recommended_user_ids


def process_profiles(profiles):
  df = pd.DataFrame(profiles)
  df = df.set_index('user_id')

  df.drop(columns=['essay0', 'essay1','essay2','essay3','essay4','essay5','essay6','essay7','essay8', 'essay9', 'bio'], inplace=True)
  categorical_columns = ['body_type', 'education', 'pets', 'diet', 'offspring', 'job']

  # One-hot encoding for categorical data with multiple value possibilities
  encoder = OneHotEncoder(sparse_output=False)
  encoded_data = encoder.fit_transform(df[categorical_columns])
  # encoded_data_dense = encoded_data.toarray()  # Convert sparse matrix to dense array

  # Binary encoding for the binary data (smokes, drinks, religion)
  df['smokes'] = (df['smokes'] == 'yes').astype(int)
  df['drinks'] = (df['drinks'] == 'yes').astype(int)
  df['religion'] = (df['religion'] == 'religious').astype(int)

  # encoding the likes and dislikes colunns
  mlb = MultiLabelBinarizer()
  likes_encoded = mlb.fit_transform(df['likes'])
  likes_columns = mlb.classes_
  dislikes_encoded = mlb.fit_transform(df['dislikes'])
  dislikes_columns = mlb.classes_
  #prefix these columns to distinguish between likes and dislikes
  likes_columns = ['like_' + col for col in likes_columns]
  dislikes_columns = ['dislike_' + col for col in dislikes_columns]

  # Combine the binary encoded and the one hot encoded values into one. 
  combined_features = np.hstack((encoded_data, df[['smokes', 'drinks', 'religion']].values))
  final_features = np.hstack((combined_features, likes_encoded, dislikes_encoded))

  likes_length = len(likes_encoded[0])
  dislikes_length = len(dislikes_encoded[0])

  custom_similarity_matrix = custom_similarity(final_features, likes_length, dislikes_length)
  similarity_df = pd.DataFrame(custom_similarity_matrix, index=df.index, columns=df.index)

  return df, similarity_df