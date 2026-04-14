import request from '@/utils/request';

export function listNotice(query?: any) {
  return request.get('/system/notice/list', { params: query });
}

export function getNotice(query?: any) {
  return request.get('/system/notice/', { params: query });
}

export function addNotice(data?: any, query?: any) {
  return request.post('/system/notice', data, { params: query });
}

export function updateNotice(data?: any, query?: any) {
  return request.put('/system/notice', data, { params: query });
}

export function delNotice(query?: any) {
  return request.delete('/system/notice/', { params: query });
}
