# mulan-swagger-api

根据 swagger 文档自动生成前端可调用的 api 文件

### 使用

api-gen-config 配置

```js
const path = require("path");

module.exports = {
  output: path.resolve(__dirname, "./packages/apis"),
  tpl: {
    // local、remote
    model: "local",

    // api模板路径，string | array
    // path: path.resolve(__dirname, './swagger/order.yml'),
    path: [
      {
        path: path.resolve(__dirname, "./swagger/order.yml"),
        name: (name, ext) => name,
      },
    ],

    // api模板目录，string
    // dir: path.resolve(__dirname, './swagger'),

    // 生成文件名称，function | string
    name: (name, ext) => name,
  },
};
```

执行命令

```shell
npm run gen:api
```

### TODO

1. 目标文件解析

- [ ] 指定解析文件的远程路径
- [x] 指定解析文件路径
- [x] 指定解析文件的目录，自动扫描指定目录下的文件
- [x] 校验已经解析过的文件
- [ ] 生成 api 返回类型

2. 生成文件

- [x] 指定生成目录路径

3. 更新

- [ ] 生成 api 更新日志

4. mock

- [ ] 生成对应的 mock 函数

5. config

- [ ] 配置校验

### api-gen-config

| 参数   | 说明               | 类型                    | 默认值          |
| ------ | ------------------ | ----------------------- | --------------- |
| output | 解析文件的生成目录 | string                  | -/packages/apis |
| tpl    | 要解析的 api 文件  | [tplConfig](#tplConfig) | -               |

### tplConfig

| 参数  | 说明                                      | 类型                                                | 默认值             |
| ----- | ----------------------------------------- | --------------------------------------------------- | ------------------ |
| model | 加载 api 模板的方式                       | local &#124; remote                                 | local              |
| dir   | 要解析的 api 文件目录，不支持目录嵌套     | string                                              | -                  |
| name  | 生成的 api 文件名                         | string &#124; (name: string, ext: string) => string | 被解析文件的文件名 |
| path  | 要解析的 api 文件路径，优先级：path > dir | string &#124; [tplConfigPath](#tplConfigPath)       | -                  |

### tplConfigPath

| 参数 | 说明                                             | 类型                                                | 默认值             |
| ---- | ------------------------------------------------ | --------------------------------------------------- | ------------------ |
| name | 生成的 api 文件名，优先级：name > tplConfig.name | string &#124; (name: string, ext: string) => string | 被解析文件的文件名 |
| path | 要解析的 api 文件路径                            | string                                              | -                  |

### 使用 api 生成工具的带来的利弊

1. 缺点
   - api 请求需要增加适配层，适配层既工具生成的代码；
   - 约定大于配置，适配层不能随意改动，降低了灵活性，需要再增加一层 api 的业务层来解决这种 api 定制的问题；
   - 需要后端的配合；
2. 有点
   - 不需要手动维护 api 文档，可以只关注业务层的开发；
