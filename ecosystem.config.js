/* eslint-disable */
const shared = {
 instances: 1,
 script: "npm",
 env: {
  NODE_ENV: "development",
 },
 env_production: {
  NODE_ENV: "production",
  DATABASE_URL: process.env.DATABASE_URL,
 }
};

module.exports = {
 apps: [
  {
   name: "@bot-messages/next",
   args: "run start:next",
   watch: "./src/next-server",
   ...shared,
  },
  {
   name: "@bot-messages/database-server",
   args: "run start:database-server",
   watch: "./src/database-server",
   ...shared,
  },
 ],

 deploy: {
  production: {
   user: "SSH_USERNAME",
   host: "SSH_HOSTMACHINE",
   ref: "origin/main",
   repo: "GIT_REPOSITORY",
   path: "DESTINATION_PATH",
   "pre-deploy-local": "",
   "post-deploy":
    "npm install && pm2 reload ecosystem.config.js --env production",
   "pre-setup": "",
  },
 },
};
