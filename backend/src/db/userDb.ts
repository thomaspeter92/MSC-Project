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
    let sql = `SELECT u.id, u.first_name, u.age, u.picture, p.location, p.bio, p.likes, p.dislikes FROM "User" u INNER JOIN "Profile" p ON u.id = p.user_id WHERE u.id = ANY ($1);`;
    let result = await this.query(sql, [user_ids]);
    return result.rows || null;
  };

  createUser = async (data: any) => {
    let sql = `INSERT INTO "User" (email, first_name, last_name, age, sex, orientation, verified) VALUES ($1, $2, $3, $4, $5, $6, false) RETURNING id;`;
    let result = await this.query(sql, [
      data.email,
      data.first_name,
      data.last_name,
      data.age,
      data.sex,
      data.orientation,
    ]);
    return result.rows[0] || null;
  };

  // For initial creation during sign up.
  createUserProfile = async (data: any) => {
    let sql = `INSERT INTO "Profile" (user_id, likes, dislikes) VALUES ($1, $2, $3);`;
    let result = await this.query(sql, [data.id, data.likes, data.dislikes]);
    return result.rows[0] || null;
  };

  // Insert picture URL
  insertPicture = async (data: { link: string; user_id: number }) => {
    let sql = `UPDATE "User" SET picture = $1 WHERE id = $2 RETURNING id;`;
    let result = await this.query(sql, [data.link, data.user_id]);
    return result.rows[0] || null;
  };

  updateAboutInfo = async (data: any) => {
    let sql = `UPDATE "Profile" SET diet=$1, offspring=$2, smokes=$3, drinks=$4, education=$5, job=$6, body_type=$7, pets=$8 WHERE user_id = $9;`;
    let result = await this.query(sql, [
      data.diet,
      data.offspring,
      data.smokes,
      data.drinks,
      data.education,
      data.job,
      data.body_type,
      data.pets,
      data.id,
    ]);
    return result.rows[0] || null;
  };

  getUnfinishedProfile = async (id: number) => {
    let sql = `SELECT id
    FROM "Profile"
    WHERE user_id = $1
    AND (education IS NULL OR pets IS NULL OR offspring IS NULL OR smokes IS NULL OR drinks IS NULL OR diet IS NULL OR job IS NULL OR body_type IS NULL);`;
    let result = await this.query(sql, [id]);
    return result.rows[0] || null;
  };

  updateUserComplete = async (id: number) => {
    let sql = `UPDATE "User" SET complete = true WHERE id = $1`;
    let result = await this.query(sql, [id]);
    return result.rows[0] || null;
  };
}

export default new UserDb();
