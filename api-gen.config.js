const path = require('path')

// 默认配置
module.exports = {
    output: path.resolve(__dirname, './apis'),
    tplPath: path.resolve(__dirname, './swagger/resolved.yml'),
}
