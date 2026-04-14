import request from '@/utils/request';

export function queryWechatUserOptions(query?: any) {
  return request.get('/platform/wechat_user/options', { params: query });
}

export function getList(query?: any) {
  return request.get('/platform/wechat_user/list', { params: query });
}
