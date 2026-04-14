import request from '@/utils/request';

export function list(query?: any) {
  return request.get('/monitor/online/list', { params: query });
}

export function forceLogout(query?: any) {
  return request.delete('/monitor/online/', { params: query });
}
