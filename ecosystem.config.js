/* eslint-disable */
const shared = {
 instances: 1,
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
   script: "npm",
   args: ["run", "start:next"],
   ...shared,
  },
  {
   script: "npm",
   args: ["run", "start:database-server"],
   ...shared,
  },
 ],
};
