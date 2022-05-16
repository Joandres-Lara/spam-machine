/* eslint-disable */
const shared = {
 instances: 1,
 script: "npm",
 cwd: "./",
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
   args: "run production:next",
   ...shared,
  },
  {
   name: "bot-messages-database-server",
   args: "run production:database",
   ...shared,
  },
 ],
};
