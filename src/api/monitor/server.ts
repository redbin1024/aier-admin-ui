import request from '@/utils/request';

export function getServer(query?: any) {
  return request.get('/monitor/server', { params: query });
}
