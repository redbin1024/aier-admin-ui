import request from '@/utils/request';

export function getPermissionPage(query?: any) {
  return request.get('/platform/wechat/perms/page', { params: query });
}

export function getPermissionList(query?: any) {
  return request.get('/platform/wechat/perms/list', { params: query });
}

export function createPermission(data?: any, query?: any) {
  return request.post('/platform/wechat/perms/save', data, { params: query });
}

export function updatePermission(data?: any, query?: any) {
  return request.put('/platform/wechat/perms/update', data, { params: query });
}

export function deletePermission(permsId: string | number, query?: any) {
  return request.delete(`/platform/wechat/perms/remove/${permsId}`, {
    params: query,
  });
}

export function getPermissionDetail(permsId: string | number, query?: any) {
  return request.get(`/platform/wechat/perms/info/${permsId}`, {
    params: query,
  });
}
