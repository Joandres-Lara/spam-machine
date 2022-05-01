import { URL } from "url";

const environment = process.env.NODE_ENV || "development";

interface ConfigSequelize {
 dialect: "postgres";
 username?: string;
 password?: string;
 host?: string;
 port?: number;
 database?: string;
 dialectOptions?: {
  ssl?: {
   require: boolean;
   rejectUnauthorized: boolean;
  };
 };
}

export default function getDatabaseEnvConfig() {
 const config: ConfigSequelize = {
  dialect: "postgres",
 };

 if (environment === "production" && process.env.DATABASE_URL) {
  const url = new URL(process.env.DATABASE_URL);
  config.username = url.username;
  config.password = url.password;
  config.host = url.hostname;
  config.port = Number.parseInt(url.port);
  config.database = url.pathname.replace("/", "");
  config.dialectOptions = {
   // https://stackoverflow.com/questions/58965011/sequelizeconnectionerror-self-signed-certificate
   ssl: {
    require: true,
    rejectUnauthorized: false,
   },
  };
 } else {
  config.username = process.env.DATABASE_USERNAME;
  config.password = process.env.DATABASE_PASSWORD;
  config.host = process.env.DATABASE_HOST;
  config.port = Number.parseInt(process.env.DATABASE_PORT);
  config.database = process.env.DATABASE_NAME;
 }

 if (
  !config.username ||
  !config.password ||
  !config.host ||
  !config.port ||
  !config.database
 ) {
  throw new Error("Can't get config database of environment");
 }

 return config;
}

declare global {
 // eslint-disable-next-line @typescript-eslint/no-namespace
 namespace NodeJS {
  interface ProcessEnv {
   DATABASE_PORT: string;
   DATABASE_USERNAME: string;
   DATABASE_PASSWORD: string;
   DATABASE_HOST: string;
   DATABASE_NAME: string;
   DATABASE_URL: string;
  }
 }
}
