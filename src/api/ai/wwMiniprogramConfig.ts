import request from '@/utils/request';

export function listMiniprogramConfigs(query?: any) {
  return request.get('/ai/wework/miniprogram/list', { params: query });
}

export function getMiniprogramConfig(code: string | number, query?: any) {
  return request.get(`/ai/wework/miniprogram/${code}`, { params: query });
}

export function addMiniprogramConfig(data?: any, query?: any) {
  return request.post('/ai/wework/miniprogram', data, { params: query });
}

export function updateMiniprogramConfig(data?: any, query?: any) {
  return request.put('/ai/wework/miniprogram', data, { params: query });
}

export function delMiniprogramConfig(id: string | number, query?: any) {
  return request.delete(`/ai/wework/miniprogram/${id}`, { params: query });
}

export function updateMiniprogramStatus(
  id: string | number,
  status: string | number,
  data?: any,
  query?: any
) {
  return request.put(`/ai/wework/miniprogram/${id}/status/${status}`, data, {
    params: query,
  });
}
