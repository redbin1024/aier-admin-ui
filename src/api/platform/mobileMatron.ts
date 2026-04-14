import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/mobile_nanny/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/mobile_nanny/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/mobile_nanny/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/mobile_nanny/info/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/mobile_nanny/update', data, { params: query });
}
