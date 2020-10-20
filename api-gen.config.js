const path = require("path");

// 默认配置
module.exports = {
  output: path.resolve(__dirname, "./apis"),
  tpl: path.resolve(__dirname, "./swagger/resolved.yml"),
  // tpl: [
  //   {
  //     path: path.resolve(__dirname, "./swagger/resolved.yml"),
  //   },
  //   {
  //     path: path.resolve(__dirname, "./swagger/resolved_1.yml"),
  //   },
  // ],
  // tpl: {
  //   dir: path.resolve(__dirname, "./swagger"),
  //   setFileName: () => {},
  // },
};
