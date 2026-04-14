import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/product_delivery/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/product_delivery/save', data, {
    params: query,
  });
}

export function delTable(query?: any) {
  return request.delete('/platform/product_delivery/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/product_delivery/info/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/product_delivery/update', data, {
    params: query,
  });
}
