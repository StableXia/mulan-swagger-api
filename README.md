# mulan-swagger-api

&emsp; 由于 mulan 项目使用了 ts 这一技术栈，我们在开发过程中要写大量的类型定义。为了减轻这部分的工作量，因此开发了根据后端 openapi 文档生成前端可直接调用的 api 文件的工具。  
&emsp; api 文件内容主要包含以下几部分 parameter Type、response type、获取 request configuration 的函数、axios api、axios api hooks。

### mulan-swagger-api 要实现的功能

- [ ] 指定解析文件的远程路径
- [x] 指定解析文件路径
- [x] 指定解析文件的目录，自动扫描指定目录下的文件
- [x] 校验已经解析过的文件
- [x] 生成 api 返回类型
- [x] 指定生成目录路径
- [x] 生成对应的 mock 函数
- [ ] 配置校验

### 使用 api 生成工具前注意的一些问题（平常心）

1. 各自维护自己的 api 文件；
2. 使用该工具前一定要和对应的后端沟通清楚，他们是否愿意给我们提供规范的 openapi 文档；
3. 由于模板文件的问题可能会导致生成的 api 文件中有一些参数名不一致、名称重复的问题，需要手动 解决；
   > 比如下面这个参数名不一致的问题，函数签名入参为 orderItemUuid，但是 path 路径中的确是 orderItemNo
   > ![](https://imgkr2.cn-bj.ufileos.com/926be7a1-978c-403e-ac24-f7d2c0e27355.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=Y8ZZYhxBt4Nzx6Ub1mH8FEWH0Jw%253D&Expires=1605594973)

### 如何使用

1. 把 openapi 文档放到项目根目录下的 swagger 文件夹下；

2. 修改根目录下的 api-gen.config.js 配置文件，指定要解析的 openapi 文档；

```js
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, './packages/apis'),
    filename: (filename, ext) => `${filename}.gen`,
  },
  tpl: {
    // 指定要解析的 openapi 文档路径
    path: path.resolve(__dirname, './swagger/order.yaml'),
  },
};
```

3. 执行命令：npm run gem:api

```shell
npm run gem:api
```

### 生成的 api 文件的组成部分

1. request parameter type
   > Ifa${methodName}ReqPathParameters         
   Ifa${methodName}ReqQueryParameters  
   >  Ifa${methodName}ReqHeaderParameters      
  Ifa${methodName}RequestBody
2. response type
   > Ifa\${methodName}Response
3. 获取 axios config func
   > get\${methodName}RequestConfig
4. 获取相关 axios api
   > api${method.method.toUpperCase()}${methodName}
5. 获取相关 axios api hooks
   > use\${methodName}Resource

### 生成的 api 文件部分示例

```ts
export type IfaListOrdersResponse = PageInfoOrderListVO;

export interface IfaListOrdersReqQueryParameters {
  locationUuids?: string;
  keyword?: string;
  orderStatus?: CommonEnumVo['orderStatus'];
}

/**
 * @name getListOrdersRequestConfig
 * @path /api/v1/mulan/orderItems
 * @description 订单列表查询
 */
export function getListOrdersRequestConfig(
  params?: IfaListOrdersReqQueryParameters,
  opts?: AxiosRequestConfig,
): AxiosRequestConfig {
  const { ...query } = params;

  const url = '/api/v1/mulan/orderItems';

  return {
    url,
    method: 'get',
    params: query,
    ...opts,
  };
}
```

### 生成的 api 文件的使用

1. axios config func

```ts
import React, { useEffect } from 'react'
import { useResource } from 'react-request-hook';
import {
  getGetOrderDetailRequestConfig,
  IfaGetOrderDetailResponse,
} from '@mulan/apis/order.gen';

export function useResourceOrderDetail() {
  const [response, request] = useResource(getGetOrderDetailRequestConfig);

  return {
    request,
    cancel: response.cancel,
    error: response.error,
    isLoading: response.isLoading,
    responseData: response.data as IfaGetOrderDetailResponse,
  };
}

function Demo() {
  const { request, responseData } = useResourceOrderDetail()

  useEffect(() => {
    request({ id: 201 })
  }, [request])

  return <div>{responseData?.name}<div>
}
```

2. 更多使用案例 [点我](https://github.com/WeConnect/wework-china-mulan/blob/predevelop/packages/apis/README.md)

### api-gen.config.js 配置项说明

| 参数   | 说明                 | 类型                      | 默认值 |
| ------ | -------------------- | ------------------------- | ------ |
| output | 输出的 api 文件配置  | [apiConfig](#apiConfig)   | -      |
| tpl    | 要解析的 api 文件    | [tplConfig](#tplConfig)   | -      |
| mock   | 输出的 mock 文件配置 | [mockConfig](#mockConfig) | -      |

### apiConfig

| 参数     | 说明              | 类型                                      | 默认值             |
| -------- | ----------------- | ----------------------------------------- | ------------------ |
| path     | api 文件生成路径  | string                                    | -                  |
| filename | 生成的 api 文件名 | (filename: string, ext: string) => string | 被解析文件的文件名 |

### tplConfig

| 参数  | 说明                                      | 类型                                          | 默认值 |
| ----- | ----------------------------------------- | --------------------------------------------- | ------ |
| model | 加载 api 模板的方式                       | local &#124; remote                           | local  |
| dir   | 要解析的 api 文件目录，不支持目录嵌套     | string                                        | -      |
| path  | 要解析的 api 文件路径，优先级：path > dir | string &#124; [tplConfigPath](#tplConfigPath) | -      |

### tplConfigPath

| 参数 | 说明                  | 类型   | 默认值 |
| ---- | --------------------- | ------ | ------ |
| path | 要解析的 api 文件路径 | string | -      |

### mockConfig

| 参数 | 说明               | 类型    | 默认值 |
| ---- | ------------------ | ------- | ------ |
| path | mock 文件生成路径  | string  | -      |
| open | 是否生成 mock 文件 | boolean | false  |
