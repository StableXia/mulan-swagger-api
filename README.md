# mulan-swagger-api

根据swagger文档自动生成前端可调用的api文件

### 功能列表

1. 目标文件解析
- [ ] 指定解析文件路径
- [ ] 指定解析文件的目录，自动扫描文件

2. 生成目录
- [x] 指定生成目录路径

### api-gen-config

| 参数       | 说明 |         类型 | 默认值 |
| --------- | -- | ----------- | -- |
| output     |  生成目录  |     string | -/packages/apis |
| tpl     |  swagger xml文件  |     string | array | -/packages/apis |

