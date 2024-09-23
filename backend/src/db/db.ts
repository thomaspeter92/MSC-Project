import pg from "pg";
import { IServerConfig } from "../utils/config";
import * as config from "../../server_config.json";

class Db {
  public serverConfig: IServerConfig = config;
  private static connection: pg.Pool | null = null;

  constructor() {
    this.dbConnect();
  }

  public async dbConnect() {
    try {
      if (Db.connection) {
        return Db.connection;
      }
      Db.connection = new pg.Pool({
        host: config.db_config.host,
        port: config.db_config.port,
        user: config.db_config.user,
        password: config.db_config.password,
        database: config.db_config.database,
      });
      console.log("Connected to the DB");
    } catch (error) {}
  }

  public query = (sql: string, params: any[] = []) => {
    if (Db.connection) {
      return Db.connection.query(sql, params);
    }
  };
}

export default Db;
