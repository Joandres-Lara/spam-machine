/* eslint-disable */
const path = require("path");

module.exports = {
 reactStrictMode: true,
 webpack(config) {
  config.resolve.alias = {
   ...config.resolve.alias,
   "@styles": path.resolve("./styles"),
   "@lib": path.resolve("./lib"),
   "@shared": path.resolve("../util-shared")
  };
  return config;
 },
};
