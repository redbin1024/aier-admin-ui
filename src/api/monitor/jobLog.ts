import request from '@/utils/request';

export function listJobLog(query?: any) {
  return request.get('/monitor/jobLog/list', { params: query });
}

export function delJobLog(query?: any) {
  return request.delete('/monitor/jobLog/', { params: query });
}

export function cleanJobLog(query?: any) {
  return request.delete('/monitor/jobLog/clean', { params: query });
}
