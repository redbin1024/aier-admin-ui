import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/pregnancy_tracker/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/pregnancy_tracker', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/pregnancy_tracker/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/pregnancy_tracker/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.put('/platform/pregnancy_tracker', data, { params: query });
}
