import request from '@/utils/request';

export function getToolList(query?: any) {
  return request.get('/ai/tools', { params: query });
}
