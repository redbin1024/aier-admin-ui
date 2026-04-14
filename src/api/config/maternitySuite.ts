import request from '@/utils/request';

export function addConfig(data?: any, query?: any) {
  return request.post('/platform/suite/save', data, { params: query });
}
