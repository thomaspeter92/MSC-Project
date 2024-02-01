import pg from "pg";

class Db {
  private pool = new pg.Pool({
    host: "aws-0-eu-west-2.pooler.supabase.com",
    port: 6543,
    user: "postgres.fxxqwotagugztamftphi",
    password: "HeliosChenThomasBuckley",
    database: "postgres",
  });

  query = (sql: string, params: any[] = []) => {
    return this.pool.query(sql, params);
  };

  getDedicatedClient = () => {
    return this.pool.connect();
  };
}

export default Db;
