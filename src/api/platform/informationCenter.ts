import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/customer/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/customer/save', data, { params: query });
}

export function info(query?: any) {
  return request.get('/platform/customer/info/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/customer/update', data, { params: query });
}
