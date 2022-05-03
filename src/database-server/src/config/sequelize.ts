import { config as configDotEnv } from "dotenv";
import { getDatabaseEnvConfig } from "@bot-messages/util-shared-node";

const environment = process.env.NODE_ENV || "development";

configDotEnv({ path: `.env.${environment}` });

const config = getDatabaseEnvConfig();

module.exports = {
 production: config,
 development: config,
 test: config,
 config
}
