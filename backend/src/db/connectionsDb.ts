import Db from "./db";

class ConnectionsDb extends Db {
  public getRecommendations = async (
    user_id: string,
    sexToSearch: "m" | "f",
    orientationToSearch: "gay" | "straight"
  ) => {
    console.log("DB FUNCTION");
    // need to be sure that the user only gets valid (men/women/gay/straight)
    let sql = `
      SELECT u.*, p.location, p.likes, p.dislikes
      FROM "User" u
      LEFT JOIN "Connections" c 
        ON (u.id = c.initiator_id AND c.target_id = $1)
        OR (u.id = c.target_id AND c.initiator_id = $1)
      LEFT JOIN "Profile" p
        ON u.id = p.user_id
      WHERE u.id != $1
      AND c.initiator_id IS NULL
      AND c.target_id IS NULL
      AND u.sex = $2
      AND u.orientation = $3
      LIMIT 1;`;
    let result = await this.query(sql, [
      user_id,
      sexToSearch,
      orientationToSearch,
    ]);
    return result.rows;
  };

  public getConnections = async (
    user_id: number,
    limit: number = 1_000_000
  ) => {
    let sql = `SELECT u.id, u.first_name, u.picture FROM "Connections" c INNER JOIN "User" u ON c.initiator_id = u.id WHERE c.target_id = $1 AND c.status = 'active'
    UNION
    SELECT u.id, u.first_name, u.picture FROM "Connections" c INNER JOIN "User" u ON c.target_id = u.id WHERE c.initiator_id = $1 AND c.status = 'active' LIMIT $2;`;
    let result = await this.query(sql, [user_id, limit]);
    return result.rows;
  };

  public checkConnection = async (initiator_id: number, target_id: number) => {
    let sql = `SELECT * FROM "Connections" WHERE (initiator_id = $1 AND target_id = $2) OR (initiator_id = $2 AND target_id = $1);`;
    let result = await this.query(sql, [initiator_id, target_id]);
    return result.rows;
  };

  public createConnection = async (
    initiator_id: number,
    target_id: number,
    status: string
  ) => {
    let sql = `INSERT INTO "Connections" (status, initiator_id, target_id) VALUES ($1, $2, $3)`;
    let result = await this.query(sql, [status, initiator_id, target_id]);
    return result.rows[0];
  };
}

export default new ConnectionsDb();
