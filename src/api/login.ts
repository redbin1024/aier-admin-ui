import { UserState } from '@/store/modules/user/types';
import request from '@/utils/request';

export interface LoginData {
  tenantId?: string;
  username: string;
  password: string;
  grantType?: string;
  clientId?: string;
}

export interface LoginRes {
  code: number;
  msg: string;
  data: {
    access_token: string;
    token?: string;
  };
}

export interface UserInfoRes {
  code: number;
  msg: string;
  data: UserState;
}

export function login(data?: LoginData) {
  return request.post<LoginRes>(
    '/auth/login',
    {
      ...data,
      clientId: import.meta.env.VITE_CLIENT_ID, // 后端从 body 中读取 clientId
      grantType: 'password',
    },
    {
      headers: {
        isEncrypt: true,
        isToken: false,
      },
    }
  );
}

export function register(data?: any, query?: any) {
  return request.post('/register', data, { params: query });
}

export function getInfo(query?: any) {
  return request.get('/system/user/getInfo', { params: query });
}

export function getUserInfo() {
  return request.get<UserInfoRes>('/system/user/getInfo');
}

export function logout(data?: any, query?: any) {
  return request.post('/auth/logout', data, { params: query });
}

export function getCodeImg(query?: any) {
  return request.get('/auth/code', { params: query });
}
