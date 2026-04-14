import request from '@/utils/request';

export function giftList(query?: any) {
  return request.get('/platform/contract_gift/list', { params: query });
}
