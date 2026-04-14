import request from '@/utils/request';

export function create(data?: any, query?: any) {
  return request.post('/platform/employee_post/save', data, { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/employee_post/update', data, {
    params: query,
  });
}

export function detail(id: string | number, query?: any) {
  return request.get(`/platform/employee_post/detail/${id}`, { params: query });
}

export function page(query?: any) {
  return request.get('/platform/employee_post/page', { params: query });
}
