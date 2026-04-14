import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/help-center/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/help-center/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/help-center/delete/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/help-center/info/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.put('/platform/help-center/update', data, { params: query });
}
