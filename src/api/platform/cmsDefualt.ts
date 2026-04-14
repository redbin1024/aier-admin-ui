import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/default_node/page', { params: query });
}

export function add(data?: any, query?: any) {
  return request.post('/platform/default_node/add', data, { params: query });
}

export function detail(query?: any) {
  return request.get('/platform/default_node/detail/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.put('/platform/default_node/update', data, { params: query });
}

export function remove_node(query?: any) {
  return request.delete('/platform/default_node/', { params: query });
}

export function customer_page(query?: any) {
  return request.get('/platform/default_customer/page', { params: query });
}

export function customer_add(data?: any, query?: any) {
  return request.post('/platform/default_customer/add', data, {
    params: query,
  });
}

export function customer_detail(query?: any) {
  return request.get('/platform/default_customer/detail/', { params: query });
}

export function customer_update(data?: any, query?: any) {
  return request.put('/platform/default_customer/update', data, {
    params: query,
  });
}

export function customer_remove(query?: any) {
  return request.delete('/platform/default_customer/', { params: query });
}

export function staff_page(query?: any) {
  return request.get('/platform/default_staff/page', { params: query });
}

export function get_staff_customer_list(query?: any) {
  return request.get('/platform/default_staff/customers_staff_list/', {
    params: query,
  });
}

export function staff_add(data?: any, query?: any) {
  return request.post('/platform/default_staff/add', data, { params: query });
}

export function staff_detail(query?: any) {
  return request.get('/platform/default_staff/detail/', { params: query });
}

export function staff_update(data?: any, query?: any) {
  return request.put('/platform/default_staff/update', data, { params: query });
}

export function staff_remove(query?: any) {
  return request.delete('/platform/default_staff/', { params: query });
}

export function feedpost_add(data?: any, query?: any) {
  return request.post('/platform/default_feed_post/add', data, {
    params: query,
  });
}

export function get_feedpost_page(query?: any) {
  return request.get('/platform/default_feed_post/page', { params: query });
}

export function feddpost_detail(query?: any) {
  return request.get('/platform/default_feed_post/detail/', { params: query });
}

export function feddpost_update(data?: any, query?: any) {
  return request.put('/platform/default_feed_post/update', data, {
    params: query,
  });
}

export function feedpost_remove(query?: any) {
  return request.delete('/platform/default_feed_post/', { params: query });
}
