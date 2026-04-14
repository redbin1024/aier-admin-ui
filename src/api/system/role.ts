import request from '@/utils/request';

export function listRole(query?: any) {
  return request.get('/system/role/list', { params: query });
}

export function getRole(query?: any) {
  return request.get('/system/role/', { params: query });
}

export function addRole(data?: any, query?: any) {
  return request.post('/system/role', data, { params: query });
}

export function updateRole(data?: any, query?: any) {
  return request.put('/system/role', data, { params: query });
}

export function dataScope(data?: any, query?: any) {
  return request.put('/system/role/dataScope', data, { params: query });
}

export function changeRoleStatus(data?: any, query?: any) {
  return request.put('/system/role/changeStatus', data, { params: query });
}

export function delRole(query?: any) {
  return request.delete('/system/role/', { params: query });
}

export function allocatedUserList(query?: any) {
  return request.get('/system/role/authUser/allocatedList', { params: query });
}

export function unallocatedUserList(query?: any) {
  return request.get('/system/role/authUser/unallocatedList', {
    params: query,
  });
}

export function authUserCancel(data?: any, query?: any) {
  return request.put('/system/role/authUser/cancel', data, { params: query });
}

export function authUserCancelAll(data?: any, query?: any) {
  return request.put('/system/role/authUser/cancelAll', data, {
    params: query,
  });
}

export function authUserSelectAll(data?: any, query?: any) {
  return request.put('/system/role/authUser/selectAll', data, {
    params: query,
  });
}

export function deptTreeSelect(query?: any) {
  return request.get('/system/role/deptTree/', { params: query });
}
