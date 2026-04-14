import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/customer_track/page', { params: query });
}

export function userPage(query?: any) {
  return request.get('/platform/customer_track/user_page', { params: query });
}

export function followedLogs(query?: any) {
  return request.get('/platform/customer_track/followed_logs', {
    params: query,
  });
}

export function operationLogs(query?: any) {
  return request.get('/platform/customer_track/operation_logs', {
    params: query,
  });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/customer_track/create_customer', data, {
    params: query,
  });
}

export function customer(data?: any, query?: any) {
  return request.post('/platform/customer_track/customer_follow_up', data, {
    params: query,
  });
}

export function assignLead(data?: any, query?: any) {
  return request.post('/platform/customer_track/assign_lead', data, {
    params: query,
  });
}

export function changeTag(data?: any, query?: any) {
  return request.post('/platform/customer_track/change_tag', data, {
    params: query,
  });
}
