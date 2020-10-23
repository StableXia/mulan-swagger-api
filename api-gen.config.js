const path = require("path");

module.exports = {
  output: path.resolve(__dirname, "./apis"),
  tpl: {
    // local、remote
    mode: "local",

    // api模板路径，string | array
    // path: path.resolve(__dirname, './swagger/order.yml'),
    // path: [
    //   {
    //     path: path.resolve(__dirname, './swagger/order.yml'),
    //     name: (name, ext) => name,
    //   },
    // ],

    // api模板目录，string
    dir: path.resolve(__dirname, "./swagger"),

    // 生成文件名称，function | string
    name: (name, ext) => name,
  },
};
