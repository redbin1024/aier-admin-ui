import request from '@/utils/request';

export function merchants(query?: any) {
  return request.get('/platform/club/info/merchants', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/club/save', data, { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/club/update', data, { params: query });
}

export function info(query?: any) {
  return request.get('/platform/club/info', { params: query });
}
