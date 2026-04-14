import request from '@/utils/request';

export function getRouters(query?: any) {
  return request.get('/system/menu/getRouters', { params: query });
}
