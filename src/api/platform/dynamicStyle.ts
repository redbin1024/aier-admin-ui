import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/styleDynamic/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/styleDynamic/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.get('/platform/styleDynamic/remove?id=', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/templateDynamic/info/', { params: query });
}
