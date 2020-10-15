import request from '@mulan/api';



const API = {

/**
* @name * 
*/
clear (
  payload: {
}
): Promise<any>{
  let url = '/api/v1/mulan/orderItems/clear';
return request(url,'PUT',payload)},

/**
* @name * 
*/
moveIn (
  payload: {
}
): Promise<any>{
  let url = '/api/v1/mulan/orderItems/moveIn';
return request(url,'PUT',payload)},

/**
* @name * 
*/
moveOut (
  payload: {
}
): Promise<any>{
  let url = '/api/v1/mulan/orderItems/moveOut';
return request(url,'PUT',payload)},

/**
* @name * 
*/
createOrder (
  payload: {
}
): Promise<any>{
  let url = '/api/v1/mulan/order';
return request(url,'POST',payload)},

/**
* @name * 
* @param  orderItemUuid - 
*/
confirmOrder (
  payload: {
'orderItemUuid':string,}
): Promise<any>{
  let url = '/api/v1/mulan/orderItem/{orderItemUuid}/confirm';
url = url.replace('{orderItemUuid}',payload.orderItemUuid);return request(url,'PUT',payload)},

/**
* @name * 
*/
cancelOrder (
  payload: {
}
): Promise<any>{
  let url = '/api/v1/mulan/orderItems/cancel';
return request(url,'PUT',payload)},

/**
* @name * 
*/
finishOrder (
  payload: {
}
): Promise<any>{
  let url = '/api/v1/mulan/orderItems/finish';
return request(url,'PUT',payload)},

/**
* @name * 
* @param  locationUuid - 
* @param  keyword - 
* @param  orderStatus - 
* @param  orderType - 
* @param  cycleType - 
* @param  startTime - 
* @param  endTime - 
* @param  page - 
* @param  size - 
*/
listOrders (
  payload: {
'locationUuid':string,'keyword':string,'orderStatus':string,'orderType':string,'cycleType':string,'startTime':number,'endTime':number,'page'?:number,'size'?:number,}
): Promise<any>{
  let url = '/api/v1/mulan/orderItems';
return request(url,'GET',payload)},

/**
* @name * 
* @param  orderItemUuid - 
*/
getOrderDetail (
  payload: {
'orderItemUuid':string,}
): Promise<any>{
  let url = '/api/v1/mulan/orderItem/{orderItemUuid}';
url = url.replace('{orderItemUuid}',payload.orderItemUuid);return request(url,'GET',payload)},

/**
* @name * 
* @param  orderItemUuid - 
* @param  remark - 
*/
editRemark (
  payload: {
'orderItemUuid':string,'remark':string,}
): Promise<any>{
  let url = '/api/v1/mulan/orderItem/{orderItemUuid}/remark';
url = url.replace('{orderItemUuid}',payload.orderItemUuid);return request(url,'PUT',payload)},

/**
* @name * 
* @param  contractNo - 
*/
getOrder (
  payload: {
'contractNo':string,}
): Promise<any>{
  let url = '/api/v1/crm/contract/{contractNo}';
url = url.replace('{contractNo}',payload.contractNo);return request(url,'GET',payload)},

/**
* @name * 
*/
createOrder_1 (
  payload: {
}
): Promise<any>{
  let url = '/api/v1/crm/order';
return request(url,'POST',payload)},

/**
* @name * 
* @param  contractNo - 
*/
confirmOrder_1 (
  payload: {
'contractNo':string,}
): Promise<any>{
  let url = '/api/v1/crm/contract/{contractNo}/confirm';
url = url.replace('{contractNo}',payload.contractNo);return request(url,'PUT',payload)},

/**
* @name * 
* @param  contractNo - 
*/
cancelOrder_1 (
  payload: {
'contractNo':string,}
): Promise<any>{
  let url = '/api/v1/crm/contract/{contractNo}/cancel';
url = url.replace('{contractNo}',payload.contractNo);return request(url,'PUT',payload)},

/**
* @name * 
* @param  contractNo - 
*/
releaseFutureReserve (
  payload: {
'contractNo':string,}
): Promise<any>{
  let url = '/api/v1/crm/contract/{contractNo}/releaseFutureReserve';
url = url.replace('{contractNo}',payload.contractNo);return request(url,'PUT',payload)},

/**
* @name * 
* @param  contractNo - 
*/
getOrder_1 (
  payload: {
'contractNo':string,}
): Promise<any>{
  let url = '/rpc/v1/contract/{contractNo}';
url = url.replace('{contractNo}',payload.contractNo);return request(url,'GET',payload)},

/**
* @name * 
* @param  customerUuids - 
* @param  orderStatus - 
* @param  orderType - 
*/
getOrders (
  payload: {
'customerUuids':string,'orderStatus':string,'orderType':string,}
): Promise<any>{
  let url = '/rpc/v1/orders';
return request(url,'GET',payload)},

/**
* @name * 
*/
morningRun (
  payload: {
}
): Promise<any>{
  let url = '/api/v1/fe/morningRun';
return request(url,'POST',payload)},

/**
* @name * 
*/
ping (
  payload: {
}
): Promise<any>{
  let url = '/ping';
return request(url,'GET',payload)},

}

export default API
