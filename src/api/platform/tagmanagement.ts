import request from '@/utils/request';

export function list(query?: any) {
  return request.get('/platform/invitation_label/info', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/invitation_label/save', data, {
    params: query,
  });
}
