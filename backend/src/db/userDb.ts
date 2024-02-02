import Db from "./db";

class UserDb extends Db {
  getUserByEmail = async (email: string) => {
    let sql = 'SELECT * FROM "User" WHERE email = $1;';
    let result = await this.query(sql, [email]);
    return result.rows[0] || null;
  };

  getUserById = async (id: number) => {
    let sql = 'SELECT * FROM "User" WHERE id = $1;';
    let result = await this.query(sql, [id]);
    return result.rows[0] || null;
  };

  getUserProfile = async (user_id: number) => {
    let sql = `SELECT u.*, p.* FROM "User" u INNER JOIN "Profile" p ON p.user_id = u.id WHERE u.id = $1;`;
    let result = await this.query(sql, [user_id]);
    return result.rows[0] || null;
  };

  getListOfUsers = async (user_ids: number[]) => {
    let sql = `SELECT u.id, u.first_name, u.username, u.age, u.picture, p.location, p.bio, p.likes, p.dislikes FROM "User" u INNER JOIN "Profile" p ON u.id = p.user_id WHERE u.id = ANY ($1);`;
    let result = await this.query(sql, [user_ids]);
    return result.rows || null;
  };
}

export default new UserDb();
