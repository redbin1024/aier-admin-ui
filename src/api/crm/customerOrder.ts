import request from '@/utils/request';

export function getContractPage(query?: any) {
  return request.get('/mp/customer_track/contract_page', { params: query });
}

export function getContractList(query?: any) {
  return request.get('/mp/customer_track/contract_list', { params: query });
}

export function getContractDetail(query?: any) {
  return request.get('/mp/customer_track/contract_detail', { params: query });
}

export function orderEntry(data?: any, query?: any) {
  return request.post('/mp/customer_track/orderEntry', data, { params: query });
}

export function updateOrder(data?: any, query?: any) {
  return request.post('/mp/customer_track/updateOrder', data, {
    params: query,
  });
}

export function cancelOrder(query?: any) {
  return request.get('/mp/customer_track/cancelOrder', { params: query });
}

export function getOrderDetail(query?: any) {
  return request.get('/mp/customer_track/getOrderDetail', { params: query });
}

export function collectContractPayment(data?: any, query?: any) {
  return request.post('/mp/customer_track/collectContractPayment', data, {
    params: query,
  });
}

export function extensionOrder(data?: any, query?: any) {
  return request.post('/mp/customer_track/extensionOrder', data, {
    params: query,
  });
}

export function exportOrder(data?: any, query?: any) {
  return request.post('/mp/customer_track/exportOrder', data, {
    params: query,
  });
}

export function getContractStats(query?: any) {
  return request.get('/mp/customer_track/contract_stats', { params: query });
}

export function getPackageList(query?: any) {
  return request.get('/mp/package/list', { params: query });
}
