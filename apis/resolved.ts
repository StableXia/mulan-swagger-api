/* eslint-disable @typescript-eslint/no-explicit-any, prefer-const */
/**
 * 该文件是根据后端的 API 文档自动生成，禁止修改
 * 
 * title: OpenAPI definition
 * description: 
 * version: v0
 */
import type { AxiosTransformer, AxiosRequestConfig } from 'axios';




/**
* @name 
* 
*/
export function clear(
  payload?: {
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/mulan/orderItems/clear';
  return (): AxiosRequestConfig => ({
    url,
    method: 'PUT',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
*/
export function moveIn(
  payload?: {
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/mulan/orderItems/moveIn';
  return (): AxiosRequestConfig => ({
    url,
    method: 'PUT',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
*/
export function moveOut(
  payload?: {
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/mulan/orderItems/moveOut';
  return (): AxiosRequestConfig => ({
    url,
    method: 'PUT',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
*/
export function createOrder(
  payload?: {
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/mulan/order';
  return (): AxiosRequestConfig => ({
    url,
    method: 'POST',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
* @param  orderItemUuid - 
*/
export function confirmOrder(
  payload?: {
  'orderItemUuid':string,
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/mulan/orderItem/{orderItemUuid}/confirm';
url = url.replace('{orderItemUuid}',payload.orderItemUuid);  return (): AxiosRequestConfig => ({
    url,
    method: 'PUT',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
*/
export function cancelOrder(
  payload?: {
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/mulan/orderItems/cancel';
  return (): AxiosRequestConfig => ({
    url,
    method: 'PUT',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
*/
export function finishOrder(
  payload?: {
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/mulan/orderItems/finish';
  return (): AxiosRequestConfig => ({
    url,
    method: 'PUT',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
* @param  page - 
* @param  size - 
*/
export function listOrders(
  payload?: {
  'page'?:number,
  'size'?:number,
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/mulan/orderItems';
  return (): AxiosRequestConfig => ({
    url,
    method: 'GET',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
* @param  orderItemUuid - 
*/
export function getOrderDetail(
  payload?: {
  'orderItemUuid':string,
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/mulan/orderItem/{orderItemUuid}';
url = url.replace('{orderItemUuid}',payload.orderItemUuid);  return (): AxiosRequestConfig => ({
    url,
    method: 'GET',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
* @param  contractNo - 
*/
export function getOrder(
  payload?: {
  'contractNo':string,
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/crm/contract/{contractNo}';
url = url.replace('{contractNo}',payload.contractNo);  return (): AxiosRequestConfig => ({
    url,
    method: 'GET',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
*/
export function createOrder_1(
  payload?: {
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/crm/order';
  return (): AxiosRequestConfig => ({
    url,
    method: 'POST',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
* @param  contractNo - 
*/
export function confirmOrder_1(
  payload?: {
  'contractNo':string,
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/crm/contract/{contractNo}/confirm';
url = url.replace('{contractNo}',payload.contractNo);  return (): AxiosRequestConfig => ({
    url,
    method: 'PUT',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
* @param  contractNo - 
*/
export function cancelOrder_1(
  payload?: {
  'contractNo':string,
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/crm/contract/{contractNo}/cancel';
url = url.replace('{contractNo}',payload.contractNo);  return (): AxiosRequestConfig => ({
    url,
    method: 'PUT',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
* @param  contractNo - 
*/
export function releaseFutureReserve(
  payload?: {
  'contractNo':string,
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/crm/contract/{contractNo}/releaseFutureReserve';
url = url.replace('{contractNo}',payload.contractNo);  return (): AxiosRequestConfig => ({
    url,
    method: 'PUT',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
* @param  contractNo - 
*/
export function getOrder_1(
  payload?: {
  'contractNo':string,
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/rpc/v1/contract/{contractNo}';
url = url.replace('{contractNo}',payload.contractNo);  return (): AxiosRequestConfig => ({
    url,
    method: 'GET',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
* @param  customerUuids - 
* @param  orderStatus - 
* @param  orderType - 
*/
export function getOrders(
  payload?: {
  'customerUuids':string,
  'orderStatus':string,
  'orderType':string,
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/rpc/v1/orders';
  return (): AxiosRequestConfig => ({
    url,
    method: 'GET',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
*/
export function morningRun(
  payload?: {
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/api/v1/fe/morningRun';
  return (): AxiosRequestConfig => ({
    url,
    method: 'POST',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

/**
* @name 
* 
*/
export function ping(
  payload?: {
    },
  transformers?: AxiosTransformer[] | AxiosTransformer,
) {
  let url = '/ping';
  return (): AxiosRequestConfig => ({
    url,
    method: 'GET',
    transformResponse: transformers,
    data: payload,
    params: payload
  })
}

