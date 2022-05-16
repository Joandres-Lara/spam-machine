/* eslint-disable */
const shared = {
 instances: 1,
 script: "npm",
 max_restarts: 0,
 autorestart: false,
 cron_restart: 0,
 env_production: {
  NODE_ENV: "production",
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
  NEXT_PUBLIC_DATABASE_API_SERVER_URL:
   process.env.NEXT_PUBLIC_DATABASE_API_SERVER_URL,
 },
};

module.exports = {
 apps: [
  {
   name: "bot-messages-next",
   args: "start",
   cwd: "./src/next-server",
   out_file: "./logs/bot-messages-next.log",
   error_file: "./logs/bot-messages-error-next.log",
   ...shared,
  },
  {
   name: "bot-messages-database-server",
   args: "start",
   cwd: "./src/database-server",
   out_file: "./logs/bot-messages-database.log",
   error_file: "./logs/bot-messages-error-database.log",
   ...shared,
  },
 ],
};
