from db.database import fetch_profiles
import recommender.recommender as recommender

def main():
  profiles = fetch_profiles()
  recommender.process_essays(profiles)



if __name__ == '__main__':
  main()