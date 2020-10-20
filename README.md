# mulan-swagger-api

根据 swagger 文档自动生成前端可调用的 api 文件

### 功能列表

1. 目标文件解析

- [x] 指定解析文件路径
- [x] 指定解析文件的目录，自动扫描指定目录下的文件
- [x] 校验已经解析过的文件
- [ ] 生成 api 返回类型

2. 生成文件

- [x] 指定生成目录路径

3. 更新

- [x] 生成 api 更新日志

### api-gen-config

| 参数   | 说明                      | 类型                                                                                           | 默认值          |
| ------ | ------------------------- | ---------------------------------------------------------------------------------------------- | --------------- |
| output | 解析文件的生成目录        | string                                                                                         | -/packages/apis |
| tpl    | 要解析的 swagger xml 文件 | string &#124; [tplArrayConfig](#tplArrayConfig)[] &#124; [tplObjectConfig](#tplObjectConfig)[] | -               |

### tplArrayConfig

| 参数 | 说明              | 类型   | 默认值          |
| ---- | ----------------- | ------ | --------------- |
| name | 生成的 api 文件名 | string | path 中的文件名 |
| path | 文件路径          | string | -               |

### tplObjectConfig

| 参数        | 说明                                          | 类型                                  | 默认值 |
| ----------- | --------------------------------------------- | ------------------------------------- | ------ |
| dir         | 要解析的 swagger xml 文件目录，不支持目录嵌套 | string                                | -      |
| setFileName | 设置生成文件名的回调                          | (name: string, ext: string) => string | -      |
