import request from '@/utils/request';

export function list(query?: any) {
  return request.get('/monitor/operlog/list', { params: query });
}

export function delOperlog(query?: any) {
  return request.delete('/monitor/operlog/', { params: query });
}

export function cleanOperlog(query?: any) {
  return request.delete('/monitor/operlog/clean', { params: query });
}
