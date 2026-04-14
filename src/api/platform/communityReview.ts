import request from '@/utils/request';

export function list(query?: any) {
  return request.get('/platform/community/list', { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/community/post?postIds=', { params: query });
}

export function options(query?: any) {
  return request.get('/platform/topic/options', { params: query });
}
