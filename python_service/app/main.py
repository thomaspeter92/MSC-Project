from db.database import fetch_profiles
import recommender.recommender as recommender

def main():
  profiles = fetch_profiles()


if __name__ == '__main__':
  main()