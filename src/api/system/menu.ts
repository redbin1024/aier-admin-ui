import request from '@/utils/request';

export function listMenu(query?: any) {
  return request.get('/system/menu/list', { params: query });
}

export function getMenu(query?: any) {
  return request.get('/system/menu/', { params: query });
}

export function treeselect(query?: any) {
  return request.get('/system/menu/treeselect', { params: query });
}

export function roleMenuTreeselect(query?: any) {
  return request.get('/system/menu/roleMenuTreeselect/', { params: query });
}

export function addMenu(data?: any, query?: any) {
  return request.post('/system/menu', data, { params: query });
}

export function updateMenu(data?: any, query?: any) {
  return request.put('/system/menu', data, { params: query });
}

export function delMenu(query?: any) {
  return request.delete('/system/menu/', { params: query });
}

export function getTenantPackageMenuTreeselect(
  packageId: string | number,
  query?: any
) {
  return request.get(`/system/menu/tenantPackageMenuTreeselect/${packageId}`, {
    params: query,
  });
}
