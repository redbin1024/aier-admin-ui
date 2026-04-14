import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/contract_gift/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/contract_gift/save', data, { params: query });
}

export function info(query?: any) {
  return request.get('/platform/contract_gift/info/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/contract_gift/update', data, {
    params: query,
  });
}
