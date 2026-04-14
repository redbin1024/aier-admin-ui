import request from '@/utils/request';

export function listTenantFunction(query?: any) {
  return request.get('/system/tenant-function/list', { params: query });
}

export function exportTenantFunction(data?: any, query?: any) {
  return request.post('/system/tenant-function/export', data, {
    params: query,
  });
}

export function getTenantFunction(functionId: string | number, query?: any) {
  return request.get(`/system/tenant-function/${functionId}`, {
    params: query,
  });
}

export function getFunctionsByPackage(packageId: string | number, query?: any) {
  return request.get(`/system/tenant-function/package/${packageId}`, {
    params: query,
  });
}

export function getAllEnabledFunctions(query?: any) {
  return request.get('/system/tenant-function/all-enabled', { params: query });
}

export function getFunctionByCode(functionCode: string | number, query?: any) {
  return request.get(`/system/tenant-function/code/${functionCode}`, {
    params: query,
  });
}

export function addTenantFunction(data?: any, query?: any) {
  return request.post('/system/tenant-function', data, { params: query });
}

export function updateTenantFunction(data?: any, query?: any) {
  return request.put('/system/tenant-function', data, { params: query });
}

export function delTenantFunction(functionIds: string | number, query?: any) {
  return request.delete(`/system/tenant-function/${functionIds}`, {
    params: query,
  });
}
