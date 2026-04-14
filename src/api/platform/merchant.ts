import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/merchant/page', { params: query });
}

export function detail(query?: any) {
  return request.get('/platform/merchant/detail/', { params: query });
}

export function audit(data?: any, query?: any) {
  return request.post('/platform/merchant/audit', data, { params: query });
}
