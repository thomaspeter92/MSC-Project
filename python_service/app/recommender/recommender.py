import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer #for the text vecotrisation
# from sklearn.metrics.pairwise import linear_kernel
import spacy
# from sentence_transformers import SentenceTransformer
# import numpy as np
# from textblob import TextBlob
<<<<<<< HEAD
import nltk
from nltk import FreqDist
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import re

# Ensure you have the necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')
=======
from db.database import update_likes
>>>>>>> 0f808e50ab0b0219eeb8a16e1eb4ab0070cab9cb


# Load the spaCy model
nlp = spacy.load("en_core_web_md")


def find_common_phrases(texts, target_words, window_size=5):
    """
    Find common words or phrases around target words within a specified window size.
    :param texts: List of texts.
    :param target_words: List of target words like 'like', 'love', etc.
    :param window_size: Number of words around the target word to consider.
    :return: A frequency distribution of words.
    """
    stop_words = set(stopwords.words('english'))

    # Preprocess the texts
    texts = [re.sub(r'\W', ' ', text.lower()) for text in texts]

    # Tokenize the texts
    tokenized_texts = [word_tokenize(text) for text in texts]

    # Context words around the target words
    context_words = []

    for tokens in tokenized_texts:
        for i, word in enumerate(tokens):
            if word in target_words:
                # Define the window range
                start = max(i - window_size, 0)
                end = min(i + window_size + 1, len(tokens))
                # Add the context words to the list
                context_words.extend([w for w in tokens[start:i] + tokens[i+1:end] if w not in stop_words])

    # Frequency distribution of context words
    freq_dist = FreqDist(context_words)
    return freq_dist



def extract_keywords(sentence):
    doc = nlp(sentence)
    keywords = []

    for chunk in doc.noun_chunks:
      # Filter out pronouns and non-noun parts
      filtered_chunk = [token.text for token in chunk if token.pos_ in ['NOUN', 'PROPN']]
      if filtered_chunk:
          # Join the filtered chunk to form a simplified phrase
          keywords.append(' '.join(filtered_chunk))


    # Option 2: Extract key nouns only
    # for token in doc:
    #     if token.pos_ in ['NOUN', 'PROPN']:  # Proper nouns and nouns
    #         keywords.append(token.text)

    return keywords

def extract_likes_dislikes(text):
    likes, dislikes = [], []
    doc = nlp(text)
    like_keywords = ["like",
    "Adore", "Appreciate", "Care for", "Choose", "Crave",
    "Delight in", "Desire", "Enjoy", "Fancy", "Favor",
    "Feel like", "Go for", "Go in for", "Lean toward", "Lean towards",
    "Love", "Pick", "Prefer", "Rejoice in", "Relish",
    "Revel in", "Savor", "Take to", "Want", "Welcome",
    "Wish for"
    ]
    dislike_keywords = [
    "Dislike", "Hate", "Detest", "Abhor", "Loathe",
    "Despise", "Resent", "Reject", "Avoid", "Shun",
    "Disapprove", "Disfavor", "Decline", "Oppose", "Recoil from",
    "Spurn", "Repudiate", "Disdain", "Scoff at", "Frown on",
    "Shrink from", "Be averse to", "Have no taste for", "Find distasteful", "Be turned off by",
    "Not care for", "Not be fond of"
    ]

    for ent in doc.ents:  # Iterate through named entities
        sentence = ent.sent.text.lower()
        if any(kw in sentence for kw in like_keywords):
            likes.append(ent.text)
        elif any(kw in sentence for kw in dislike_keywords):
            dislikes.append(ent.text)

        if len(likes) >= 5 and len(dislikes) >= 5:
            break

    return likes[:5], dislikes[:5]


'''it seems despite TFIDF being good for some things, it doesnt grasp sentiment and was causing some issues with matches
 E.G. The following two terms matched highly despite being very opposite in meaning.: 
  - i like dogs and i don't like to shave.
  - i hate dogs and i love to shave.
'''

def process_essays(users):
    df = pd.DataFrame(users)
    # df['essay0'] = df['essay0'].fillna('') #fill empty essays 
    essay_columns = [f'essay{i}' for i in range(10)]  
    df['all_essays'] = df[essay_columns].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)

    # now I wanna get the words associated with likes/dislikes from the texts. 
    texts = df['all_essays'].tolist()


    df[['likes', 'dislikes']] = df['all_essays'].apply(lambda x: pd.Series(extract_likes_dislikes(x)))
    print(df['likes'])
    print(df.loc[5]['all_essays'])

    df.to_csv('gays.csv', index=False)

  df.drop('all_essays', axis=1, inplace=True)

  

  # csv_file_path = 'data_with_likes.csv'

  # Export the DataFrame to a CSV file
  # df.to_csv(csv_file_path, index=False)
  

    # like_words = ['like', 'love', 'enjoy']
    # dislike_words = ['dislike', 'hate', "don't like"]
    # like_phrases = find_common_phrases(texts, like_words)
    # dislike_phrases = find_common_phrases(texts, dislike_words)
    # print('COMMON LIKE WORDS:', like_phrases.most_common(20))
    # print('COMMON DISLIKE WORDS:', dislike_phrases.most_common(20))

    # Apply the extract_likes_dislikes function to all essays

# tfidf = TfidfVectorizer(stop_words='english')
# tfidf_matrix = tfidf.fit_transform(df['all_essays'])
# similarity_overview = linear_kernel(tfidf_matrix, tfidf_matrix)
# similarity_df = pd.DataFrame(similarity_overview)
# profile_similarities = similarity_overview[0] #This index is the index of user we are comparing to. 
# top_indices = (-profile_similarities).argsort()[1:11]  # Skip the first one

# likes, dislikes = extract_likes_dislikes(df.loc[top_indices[0]]['all_essays'])
# print(likes, dislikes)

# Get the top similarity scores using the indices
# top_scores = profile_similarities[top_indices]


# def get_sentiment(text):
#   # Returns the polarity score of the text
#   return TextBlob(text).sentiment.polarity


# def analyse_sentiment(users):
#   df = pd.DataFrame(users)
#   df['essay0'] = df['essay0'].fillna('')  # Fill empty essays

#   # Load the SentenceTransformer model
#   model = SentenceTransformer('all-MiniLM-L6-v2')
  
#   # Encode all essays to vectors
#   essay_vectors = model.encode(df['essay0'].tolist())

#   # Compute cosine similarity matrix
#   similarity_overview = np.dot(essay_vectors, essay_vectors.T)

#   # Normalize the similarity matrix for cosine similarity calculation
#   norms = np.linalg.norm(essay_vectors, axis=1)
#   similarity_overview = similarity_overview / norms[:, np.newaxis] / norms[np.newaxis, :]

#   # Get sentiment scores
#   df['sentiment'] = df['essay0'].apply(get_sentiment)

#   sentiment_threshold = 0.2  # Adjust this threshold as needed


#   # Adjusting similarity scores based on sentiment
#   for i in range(len(df)):
#     for j in range(len(df)):
#       if abs(df['sentiment'][i] - df['sentiment'][j]) > sentiment_threshold:
#         similarity_overview[i][j] *= 0.1  # More aggressive reduction


#   # Get similarity scores for the first profile (index 0)
#   profile_similarities = similarity_overview[0]

#   # Find top indices, skipping the first one (self-similarity)
#   top_indices = (-profile_similarities).argsort()[1:11]

#   # Print the most similar essay to the first user's essay0
#   print("Most similar essay to the first user's essay0:")
#   print(df.loc[top_indices[0]]['essay0'])
#   print("\nFirst user's essay0:")
#   print(df.loc[0]['essay0'])


