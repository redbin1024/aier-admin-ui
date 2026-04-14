import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/tk/enterprise/list', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/tk/enterprise', data, { params: query });
}

export function update(data?: any, query?: any) {
  return request.put('/platform/tk/enterprise', data, { params: query });
}
