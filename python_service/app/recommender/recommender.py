import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer #for the text vecotrisation
from sklearn.metrics.pairwise import linear_kernel


def process_essays(users):
  df = pd.DataFrame(users)
  essay_columns = [f'essay{i}' for i in range(10)]  
  df['all_essays'] = df[essay_columns].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)
  tfidf = TfidfVectorizer(stop_words='english')
  tfidf_matrix = tfidf.fit_transform(df['all_essays'])
  similarity_overview = linear_kernel(tfidf_matrix, tfidf_matrix)
  similarity_df = pd.DataFrame(similarity_overview)
  profile_similarities = similarity_overview[0] #This index is the index of user we are comparing to. 
  top_indices = (-profile_similarities).argsort()[1:11]  # Skip the first one

  # Get the top similarity scores using the indices
  top_scores = profile_similarities[top_indices]
  print(df.loc[top_indices[0]]['all_essays'])
  print("\n")
  print(df.loc[0]['all_essays'])
