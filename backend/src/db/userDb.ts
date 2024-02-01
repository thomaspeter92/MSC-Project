import Db from "./db";

class UserDb extends Db {
  getUserProfile = async (user_id: number) => {
    let sql = `SELECT u.*, p.* FROM "User" u INNER JOIN "Profile" p ON p.user_id = u.id WHERE u.id = $1;`;
    let result = await this.query(sql, [user_id]);
    return result.rows[0] || null;
  };
}

export default new UserDb();
