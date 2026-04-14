import request from '@/utils/request';

export function listDept(query?: any) {
  return request.get('/system/dept/list', { params: query });
}

export function listDeptExcludeChild(query?: any) {
  return request.get('/system/dept/list/exclude/', { params: query });
}

export function getDept(query?: any) {
  return request.get('/system/dept/', { params: query });
}

export function addDept(data?: any, query?: any) {
  return request.post('/system/dept', data, { params: query });
}

export function updateDept(data?: any, query?: any) {
  return request.put('/system/dept', data, { params: query });
}

export function delDept(query?: any) {
  return request.delete('/system/dept/', { params: query });
}
