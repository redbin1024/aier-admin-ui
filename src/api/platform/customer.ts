import request from '@/utils/request';

export function getCustomerOptions(query?: any) {
  return request.get('/platform/customer/options', { params: query });
}
