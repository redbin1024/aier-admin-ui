import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/cs/agent/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/cs/agent/create', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/cs/agent/delete/', { params: query });
}

export function queryUserCustomer(query?: any) {
  return request.get('/platform/customerService/queryUserCustomer', {
    params: query,
  });
}

export function assignUserRole(data?: any, query?: any) {
  return request.post('/platform/wechat_user/user-roles/assign', data, {
    params: query,
  });
}

export function removeUserRole(
  userId: string | number,
  roleId: string | number,
  query?: any
) {
  return request.delete(
    `/platform/wechat_user/user-roles/remove/${userId}/${roleId}`,
    { params: query }
  );
}
