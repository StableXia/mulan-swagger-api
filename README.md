# mulan-swagger-api

根据swagger文档自动生成前端可调用的api文件

### 功能列表

1. 目标文件解析
- [ ] 指定解析文件路径
- [ ] 指定解析文件的目录，自动扫描指定目录下的文件

2. 生成目录
- [x] 指定生成目录路径

### api-gen-config

| 参数       | 说明 |         类型 | 默认值 |
| -- | -- | -- | -- |
| output     |  解析文件的生成目录  |     string | -/packages/apis |
| tpl     |  要解析的 swagger xml 文件  |     string &#124; [tplConfig](#tplConfig)[] | - |

### tplConfig

| 参数       | 说明 |         类型 | 默认值 |
| -- | -- | -- | -- |
| name     |  生成的api文件名  |     string | path中的文件名 |
| path     |  文件路径  |     string | - |





