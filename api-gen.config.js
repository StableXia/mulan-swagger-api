const path = require('path')

// 默认配置
module.exports = {
    output: path.resolve(__dirname, './apis'),
    fileSource: {
        yml: path.resolve(__dirname, './resolved.yml')
    },
    mock: {}
}
