import request from '@/utils/request';

export function save(data?: any, query?: any) {
  return request.put('/platform/club_facilities/save', data, { params: query });
}

export function info(query?: any) {
  return request.get('/platform/club_facilities/list', { params: query });
}
