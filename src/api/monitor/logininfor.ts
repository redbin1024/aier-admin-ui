import request from '@/utils/request';

export function list(query?: any) {
  return request.get('/monitor/logininfor/list', { params: query });
}

export function delLogininfor(query?: any) {
  return request.delete('/monitor/logininfor/', { params: query });
}

export function unlockLogininfor(query?: any) {
  return request.get('/monitor/logininfor/unlock/', { params: query });
}

export function cleanLogininfor(query?: any) {
  return request.delete('/monitor/logininfor/clean', { params: query });
}
