const path = require("path");

module.exports = {
  mock: {
    // 是否生成 mock 文件
    open: false,
    // mock 文件的输出目录
    path: path.resolve(__dirname, "./mocks/generators"),
  },
  output: {
    // api 文件的输出目录
    path: path.resolve(__dirname, "./apis"),
    // 生成文件的名字
    filename: (filename, ext) => `${filename}.gen`,
  },
  tpl: {
    // 获取 openapi 模板的方式：local、remote
    mode: "local",
    // openapi 模板路径
    path: path.resolve(__dirname, "./swagger/order.yaml"),
  },
};
