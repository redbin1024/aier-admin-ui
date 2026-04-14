import request from '@/utils/request';

export function getCache(query?: any) {
  return request.get('/monitor/cache', { params: query });
}

export function listCacheName(query?: any) {
  return request.get('/monitor/cache/getNames', { params: query });
}

export function listCacheKey(query?: any) {
  return request.get('/monitor/cache/getKeys/', { params: query });
}

export function getCacheValue(query?: any) {
  return request.get('/monitor/cache/getValue/', { params: query });
}

export function clearCacheName(query?: any) {
  return request.delete('/monitor/cache/clearCacheName/', { params: query });
}

export function clearCacheKey(query?: any) {
  return request.delete('/monitor/cache/clearCacheKey/', { params: query });
}

export function clearCacheAll(query?: any) {
  return request.delete('/monitor/cache/clearCacheAll', { params: query });
}
