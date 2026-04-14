import request from '@/utils/request';

export function createEmployee(data?: any, query?: any) {
  return request.post('/platform/employee/save', data, { params: query });
}

export function updateEmployee(data?: any, query?: any) {
  return request.post('/platform/employee/update', data, { params: query });
}

export function page(query?: any) {
  return request.get('/platform/employee/page', { params: query });
}

export function list(query?: any) {
  return request.get('/platform/employee/list', { params: query });
}

export function getPostList(query?: any) {
  return request.get('/platform/employee_post/options', { params: query });
}

export function getRoleList(query?: any) {
  return request.get('/platform/employee/role_list', { params: query });
}

export function remove(id: string | number, query?: any) {
  return request.delete(`/platform/employee/remove/${id}`, { params: query });
}

export function disable(
  id: string | number,
  disable: string | number,
  data?: any,
  query?: any
) {
  return request.post(`/platform/employee/disable/${id}/${disable}`, data, {
    params: query,
  });
}

export function resetPassword(data?: any, query?: any) {
  return request.post('/platform/employee/reset_password', data, {
    params: query,
  });
}

export function bindEmployee(data?: any, query?: any) {
  return request.post('/platform/staff/bind_employee', data, { params: query });
}

export function detail(id: string | number, query?: any) {
  return request.get(`/platform/employee/detail/${id}`, { params: query });
}
