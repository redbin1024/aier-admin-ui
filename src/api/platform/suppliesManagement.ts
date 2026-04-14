import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/supplies/page', { params: query });
}

export function save1(data?: any, query?: any) {
  return request.put('/platform/supplies/save_mama', data, { params: query });
}

export function save2(data?: any, query?: any) {
  return request.put('/platform/supplies/save_baby', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/supplies/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/supplies/update', data, { params: query });
}
