import request from '@/utils/request';

export function listType(query?: any) {
  return request.get('/system/dict/type/list', { params: query });
}

export function getType(query?: any) {
  return request.get('/system/dict/type/', { params: query });
}

export function addType(data?: any, query?: any) {
  return request.post('/system/dict/type', data, { params: query });
}

export function updateType(data?: any, query?: any) {
  return request.put('/system/dict/type', data, { params: query });
}

export function delType(query?: any) {
  return request.delete('/system/dict/type/', { params: query });
}

export function refreshCache(query?: any) {
  return request.delete('/system/dict/type/refreshCache', { params: query });
}

export function optionselect(query?: any) {
  return request.get('/system/dict/type/optionselect', { params: query });
}
