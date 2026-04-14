import request from '@/utils/request';

export function listUser(query?: any) {
  return request.get('/system/user/list', { params: query });
}

export function getUser(query?: any) {
  return request.get('/system/user/', { params: query });
}

export function addUser(data?: any, query?: any) {
  return request.post('/system/user', data, { params: query });
}

export function updateUser(data?: any, query?: any) {
  return request.put('/system/user', data, { params: query });
}

export function delUser(query?: any) {
  return request.delete('/system/user/', { params: query });
}

export function resetUserPwd(data?: any, query?: any) {
  return request.put('/system/user/resetPwd', data, { params: query });
}

export function changeUserStatus(data?: any, query?: any) {
  return request.put('/system/user/changeStatus', data, { params: query });
}

export function getUserProfile(query?: any) {
  return request.get('/system/user/profile', { params: query });
}

export function updateUserProfile(data?: any, query?: any) {
  return request.put('/system/user/profile', data, { params: query });
}

export function updateUserPwd(data?: any, query?: any) {
  return request.put('/system/user/profile/updatePwd', data, { params: query });
}

export function uploadAvatar(data?: any, query?: any) {
  return request.post('/system/user/profile/avatar', data, { params: query });
}

export function getAuthRole(query?: any) {
  return request.get('/system/user/authRole/', { params: query });
}

export function updateAuthRole(data?: any, query?: any) {
  return request.put('/system/user/authRole', data, { params: query });
}

export function deptTreeSelect(query?: any) {
  return request.get('/system/user/deptTree', { params: query });
}
