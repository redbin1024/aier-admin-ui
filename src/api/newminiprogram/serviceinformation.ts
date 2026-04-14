import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/tk/service/list', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/tk/service', data, { params: query });
}

export function update(data?: any, query?: any) {
  return request.put('/platform/tk/service', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/tk/service/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/tk/service/', { params: query });
}
