import { default as express } from "express";
import { postgraphile } from "postgraphile";
import * as configs from "./config/sequelize";

const { config } = configs as {
 config: {
  username: string;
  password: string;
  host: string;
  port: string;
  database: string;
 };
};

const app = express();

app.use(
 postgraphile(
  `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`,
  "public",
  {
   // watchPg: true,
   graphiql: true,
   enableCors: true,
   dynamicJson: true,
   enhanceGraphiql: true,
   graphileBuildOptions: {
    debug: true,
   },
  }
 )
);

app.listen(5000, () => console.log("Server start"));
