import request from '@/utils/request';

export function getLeadStats(query?: any) {
  return request.get('/mp/customer_track/lead_stats', { params: query });
}

export function getMyStats(query?: any) {
  return request.get('/mp/customer_track/my_stats', { params: query });
}

export function getCustomerPage(query?: any) {
  return request.get('/mp/customer_track/page', { params: query });
}

export function getCustomerDetail(query?: any) {
  return request.get('/mp/customer_track/customer_detail', { params: query });
}

export function createCustomer(data?: any, query?: any) {
  return request.post('/mp/customer_track/create_customer', data, {
    params: query,
  });
}

export function updateDetail(data?: any, query?: any) {
  return request.post('/mp/customer_track/update_detail', data, {
    params: query,
  });
}

export function deleteCustomer(query?: any) {
  return request.get('/mp/customer_track/delete', { params: query });
}

export function customerOperate(data?: any, query?: any) {
  return request.post('/mp/customer_track/customer_operate', data, {
    params: query,
  });
}

export function getFollowedLogs(query?: any) {
  return request.get('/mp/customer_track/followed_logs', { params: query });
}

export function confirmArrivedAtStore(query?: any) {
  return request.get('/mp/customer_track/confirmArrivedAtStore', {
    params: query,
  });
}

export function transfer(data?: any, query?: any) {
  return request.post('/mp/customer_track/transfer', data, { params: query });
}

export function getSeasPage(query?: any) {
  return request.get('/mp/customer_track/seasPage', { params: query });
}

export function getSeasTotal(query?: any) {
  return request.get('/mp/customer_track/seasTotal', { params: query });
}

export function allocationCustomer(data?: any, query?: any) {
  return request.post('/mp/customer_track/allocationCustomer', data, {
    params: query,
  });
}

export function refundSeas(query?: any) {
  return request.get('/mp/customer_track/refundSeas', { params: query });
}

export function getTags(query?: any) {
  return request.get('/mp/customer_track/tags', { params: query });
}

export function getUserPage(query?: any) {
  return request.get('/mp/customer_track/user_page', { params: query });
}

export function getSourceList(query?: any) {
  return request.get('/mp/customer_track/customer_source_list', {
    params: query,
  });
}

export function getNotificationList(query?: any) {
  return request.get('/mp/customer_track/notification_list', { params: query });
}

export function exportCustomer(data?: any, query?: any) {
  return request.post('/mp/customer_track/export', data, { params: query });
}

export function getCustomerSalesStats(query?: any) {
  return request.get('/mp/customer_track/getCustomerSalesStats', {
    params: query,
  });
}

export function createReminder(data?: any, query?: any) {
  return request.post('/mp/customer_track/create_reminder', data, {
    params: query,
  });
}

export function getAssignmentStats(query?: any) {
  return request.get('/mp/customer_track/getAssignmentStats', {
    params: query,
  });
}

export function importCustomerExcel(data: FormData) {
  return request.post('/platform/customer/importExcel', data, {
    timeout: 120000,
  });
}
