import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/package/getGoodsBasicInfo', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/package', data, { params: query });
}
