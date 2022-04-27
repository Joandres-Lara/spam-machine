import { URL } from "url";
import { config as configDotEnv } from "dotenv";

const environment = process.env.NODE_ENV || "development";

configDotEnv({ path: `.env.${environment}` });
interface ConfigSequelize {
 dialect: "postgres";
 username?: string;
 password?: string;
 host?: string;
 port?: string;
 database?: string;
 dialectOptions?: {
  ssl?: {
   require: boolean;
   rejectUnauthorized: boolean;
  }
 }
}

const config : ConfigSequelize = {
 dialect: "postgres",
};

if(environment === "production"){
 const url = new URL(process.env.DATABASE_URL as string);
 config.username = url.username;
 config.password = url.password;
 config.host = url.hostname;
 config.port = url.port;
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
 config.port = process.env.DATABASE_PORT;
 config.database = process.env.DATABASE_NAME;
}

module.exports = {
 production: config,
 development: config,
 test: config
}
