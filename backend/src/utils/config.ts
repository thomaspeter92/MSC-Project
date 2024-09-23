export interface IServerConfig {
  port: number;
  db_config: {
    database: string;
    user: string;
    password: string;
    host: string;
    port: number;
  };
}
