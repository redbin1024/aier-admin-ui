import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/baby/template/page', { params: query });
}

export function list(query?: any) {
  return request.get('/platform/baby/template/getList', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/baby/template/create', data, {
    params: query,
  });
}

export function delTable(query?: any) {
  return request.delete('/platform/baby/template/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/baby/template/info/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/baby/template/update', data, {
    params: query,
  });
}
