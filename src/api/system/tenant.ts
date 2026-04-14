import request from '@/utils/request';

export function queryList(query?: any) {
  return request.get('/system/tenant/list', { params: query });
}

export function queryOptions(query?: any) {
  return request.get('/system/tenant/options', { params: query });
}

export function getById(id: string | number, query?: any) {
  return request.get(`/system/tenant/${id}`, { params: query });
}

export function syncTenantPackage(query?: any) {
  return request.get('/system/tenant/syncTenantPackage', { params: query });
}

export function querySelectOptions(query?: any) {
  return request.get('/system/tenant/package/selectList', { params: query });
}

export function changeTenantStatus(data?: any, query?: any) {
  return request.put('/system/tenant/changeStatus', data, { params: query });
}

export function createTenant(data?: any, query?: any) {
  return request.post('/system/tenant', data, { params: query });
}

export function updateTenant(data?: any, query?: any) {
  return request.put('/system/tenant', data, { params: query });
}

export function deleteTenant(tenantId: string | number, query?: any) {
  return request.delete(`/system/tenant/${tenantId}`, { params: query });
}

export function dynamicTenant(tenantId: string | number, query?: any) {
  return request.get(`/system/tenant/dynamic/${tenantId}`, { params: query });
}

export function clearTenant(query?: any) {
  return request.get('/system/tenant/dynamic/clear', { params: query });
}
