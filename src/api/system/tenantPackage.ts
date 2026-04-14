import request from '@/utils/request';

export function queryList(query?: any) {
  return request.get('/system/tenant/package/list', { params: query });
}

export function createPackage(data?: any, query?: any) {
  return request.post('/system/tenant/package', data, { params: query });
}

export function getById(id: string | number, query?: any) {
  return request.get(`/system/tenant/package/${id}`, { params: query });
}

export function updatePackage(data?: any, query?: any) {
  return request.put('/system/tenant/package', data, { params: query });
}

export function remove(id: string | number, query?: any) {
  return request.delete(`/system/tenant/package/${id}`, { params: query });
}

export function changePackageStatus(data?: any, query?: any) {
  return request.put('/system/tenant/package/changeStatus', data, {
    params: query,
  });
}
