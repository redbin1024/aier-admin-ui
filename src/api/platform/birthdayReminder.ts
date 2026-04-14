import request from '@/utils/request';

export function list(query?: any) {
  return request.get('/platform/customer/birthday_list/', { params: query });
}
