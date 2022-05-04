/* eslint-disable */
const path = require("path");

const IS_CI = process.env.CI !== undefined;
const DEV = process.env.NODE_ENV !== "production";

module.exports = {
 reactStrictMode: true,
 swcMinify: !DEV || (!DEV && !IS_CI),
 webpack(config) {
  config.resolve.alias = {
   ...config.resolve.alias,
   "@styles": path.resolve("./styles"),
   "@lib": path.resolve("./lib"),
   "@components": path.resolve("components"),
   "@hooks": path.resolve("hooks"),
   "@assets": path.resolve("assets"),
   "@graphql": path.resolve("./graphql"),
   "@interfaces": path.resolve("./interfaces"),
   "@contexts": path.resolve("./contexts")
  };

  config.module.rules.push({
   test: /\.svg$/,
   use: ["@svgr/webpack"]
  });

  return config;
 },
};
