import request from '@/utils/request';

export function getRolePage(query?: any) {
  return request.get('/platform/wechat/role/page', { params: query });
}

export function getRoleList(query?: any) {
  return request.get('/platform/wechat/role/list', { params: query });
}

export function createRole(data?: any, query?: any) {
  return request.post('/platform/wechat/role/save', data, { params: query });
}

export function updateRole(data?: any, query?: any) {
  return request.put('/platform/wechat/role/update', data, { params: query });
}

export function deleteRole(roleId: string | number, query?: any) {
  return request.delete(`/platform/wechat/role/remove/${roleId}`, {
    params: query,
  });
}

export function getRoleDetail(roleId: string | number, query?: any) {
  return request.get(`/platform/wechat/role/info/${roleId}`, { params: query });
}

export function getEmployeeRoleList(query?: any) {
  return request.get('/platform/employee/role_list', { params: query });
}

export function assignRolePermissions(data?: any, query?: any) {
  return request.post('/platform/wechat/role/assign-perms', data, {
    params: query,
  });
}

export function getRolePermissions(roleId: string | number, query?: any) {
  return request.get(`/platform/wechat/role/perms/${roleId}`, {
    params: query,
  });
}

export function getPermissionList(query?: any) {
  return request.get('/platform/wechat/perms/list', { params: query });
}
