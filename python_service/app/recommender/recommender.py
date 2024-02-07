import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import MultiLabelBinarizer


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

    df.drop(columns=['essay0', 'essay1', 'essay2', 'essay3', 'essay4', 'essay5', 'essay6', 'essay7', 'essay8', 'essay9', 'bio'], inplace=True)
    categorical_columns = ['body_type', 'education', 'pets', 'diet', 'offspring', 'job']

    # One-hot encoding for categorical data with multiple value possibilities
    encoder = OneHotEncoder(sparse_output=False)
    encoded_data = encoder.fit_transform(df[categorical_columns])

    # Binary encoding for the binary data (smokes, drinks, religion)
    df['smokes'] = (df['smokes'] == 'yes').astype(int)
    df['drinks'] = (df['drinks'] == 'yes').astype(int)
    df['religion'] = (df['religion'] == 'religious').astype(int)

    # Preparing for consistent encoding of likes and dislikes
    # Combine all likes and dislikes into a single set for fitting
    all_likes_dislikes = set().union(*df['likes'], *df['dislikes'])
    
    # Initialize MultiLabelBinarizer and fit on the combined set
    mlb = MultiLabelBinarizer()
    mlb.fit([all_likes_dislikes])  # Fit on the combined set to ensure consistent columns

    # Transform likes and dislikes using the fitted mlb
    likes_encoded = mlb.transform(df['likes'])
    dislikes_encoded = mlb.transform(df['dislikes'])

    # Combine the binary encoded, one-hot encoded, and multilabel encoded values into one
    final_features = np.hstack((encoded_data, df[['smokes', 'drinks', 'religion']].values, likes_encoded, dislikes_encoded))

    # Calculate the lengths based on the transformed data
    likes_length = likes_encoded.shape[1]
    dislikes_length = dislikes_encoded.shape[1]

    # Ensure the custom similarity function is correctly implemented
    custom_similarity_matrix = custom_similarity(final_features, likes_length, dislikes_length)
    similarity_df = pd.DataFrame(custom_similarity_matrix, index=df.index, columns=df.index)

    return df, similarity_df
