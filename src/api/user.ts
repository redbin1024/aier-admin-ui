import request from '@/utils/request';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  tenantId?: string;
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export function login(data: LoginData) {
  return request.post<LoginRes>('/api/user/login', data, {
    headers: { isEncrypt: true },
  });
}

export function logout() {
  return request.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return request.post<UserState>('/api/user/info');
}

export function getMenuList() {
  return request.get('/system/menu/getRouters');
}
