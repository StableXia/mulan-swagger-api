const path = require("path");

module.exports = {
  output: path.resolve(__dirname, "./apis"),
  tpl: {
    dir: path.resolve(__dirname, "./swagger"),
  },
};
