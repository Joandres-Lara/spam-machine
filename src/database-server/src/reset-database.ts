import { Sequelize } from "sequelize";
import * as configs from "./config/sequelize";

const { config } = configs as {
 config: {
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
 };
};

const instance = new Sequelize(config);

(async () => {
 try {
  await instance.authenticate();
  await instance.query(
   "delete from users; " +
    "delete from contacts; " +
    "delete from messages; " +
    "delete from tags; " +
    "delete from cron_jobs_messages; " +
    "delete from sending_messages; " +
    "delete from tags_messages;"
  );
  console.log("Deleted all data from database");
 } catch (e) {
  console.error(e);
 }
})();
