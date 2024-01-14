import os
import psycopg2
import psycopg2.extras


# Database connection setup
def get_db_connection():
    connection = psycopg2.connect(
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASS"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
    )
    return connection

# Simple read function to test the connection
def fetch_profiles():
    conn = get_db_connection()
    with conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor) as cur:
        cur.execute('SELECT * FROM "Profile" WHERE orientation = \'gay\';')
        profiles = cur.fetchall()
    conn.close()
    return profiles


