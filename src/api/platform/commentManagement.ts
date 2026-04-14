import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/review/list', { params: query });
}

export function replies(data?: any, query?: any) {
  return request.post('/platform/review/replies', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/review/remove/', { params: query });
}

export function remove(query?: any) {
  return request.delete('/platform/review/remove_replies/', { params: query });
}
