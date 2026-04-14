import request from '@/utils/request';

export function listConfig(query?: any) {
  return request.get('/system/config/list', { params: query });
}

export function getConfig(query?: any) {
  return request.get('/system/config/', { params: query });
}

export function getConfigKey(query?: any) {
  return request.get('/system/config/configKey/', { params: query });
}

export function addConfig(data?: any, query?: any) {
  return request.post('/system/config', data, { params: query });
}

export function updateConfig(data?: any, query?: any) {
  return request.put('/system/config', data, { params: query });
}

export function delConfig(query?: any) {
  return request.delete('/system/config/', { params: query });
}

export function refreshCache(query?: any) {
  return request.delete('/system/config/refreshCache', { params: query });
}
