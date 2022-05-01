/* eslint-disable */
const path = require("path");
const defaultResolveImport = require("postcss-import/lib/resolve-id");

module.exports = {
 plugins: {
  "postcss-import": {
   resolve(...args) {
    const [id] = args;
    if (id.startsWith("@components")) {
     return path.resolve("./components" + id.slice("@components".length));
    }
    return defaultResolveImport(...args);
   },
  },
  tailwindcss: {},
  autoprefixer: {},
 },
};
