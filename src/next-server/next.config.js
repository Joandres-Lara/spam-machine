/* eslint-disable */
const path = require("path");

module.exports = {
 reactStrictMode: true,
 webpack(config) {
  config.resolve.alias = {
   ...config.resolve.alias,
   "@styles": path.resolve("./styles"),
   "@lib": path.resolve("./lib"),
   "@components": path.resolve("components"),
   "@assets": path.resolve("assets")
  };

  config.module.rules.push({
   test: /\.svg$/,
   use: ["@svgr/webpack"]
  });

  return config;
 },
};
