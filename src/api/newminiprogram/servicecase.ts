import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/tk/successCase/list', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/tk/successCase', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/tk/successCase/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/tk/successCase/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.put('/platform/tk/successCase', data, { params: query });
}
