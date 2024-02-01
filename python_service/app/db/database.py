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
def fetch_profiles(user_id):
    conn = get_db_connection()

    try: 
        with conn.cursor() as cursor:
            query = 'SELECT sex, orientation FROM "User" WHERE id = %s;'
            cursor.execute(query, (user_id,))
            user_info = cursor.fetchone()

        if user_info is None:
            return []
        
        sex, orientation = user_info
        sex_to_search = 'f' if (sex == 'm' and orientation == 'straight') or (sex == 'f' and orientation == 'gay') else 'm'
        
        with conn.cursor(cursor_factory = psycopg2.extras.RealDictCursor) as cur:
            query = '''
            SELECT p.* FROM "Profile" p
            JOIN "User" u ON p.user_id = u.id
            WHERE (u.id = %s)
            OR (u.id != %s AND u.sex = %s AND u.orientation = %s AND NOT EXISTS (
                SELECT 1 FROM "Connections" c WHERE (c.initiator_id = u.id OR c.target_id = u.id)
            ))
            LIMIT 100'''
            cur.execute(query, ( user_id, user_id,sex_to_search, orientation))
            profiles = cur.fetchall()
        return profiles
    finally:
        conn.close()


