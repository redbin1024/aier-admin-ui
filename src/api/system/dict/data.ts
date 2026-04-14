import request from '@/utils/request';

export function listData(query?: any) {
  return request.get('/system/dict/data/list', { params: query });
}

export function getData(query?: any) {
  return request.get('/system/dict/data/', { params: query });
}

export function getDicts(query?: any) {
  return request.get('/system/dict/data/type/', { params: query });
}

export function addData(data?: any, query?: any) {
  return request.post('/system/dict/data', data, { params: query });
}

export function updateData(data?: any, query?: any) {
  return request.put('/system/dict/data', data, { params: query });
}

export function delData(query?: any) {
  return request.delete('/system/dict/data/', { params: query });
}
