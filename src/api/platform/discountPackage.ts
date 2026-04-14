import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/package/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/package/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/package/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/package/info/', { params: query });
}

export function online(data?: any, query?: any) {
  return request.post(
    `/platform/package/online/${query.packageId}/${query.status}`,
    data,
    { params: query }
  );
}

export function update(data?: any, query?: any) {
  return request.post('/platform/package/update', data, { params: query });
}

export function homepage(data?: any, query?: any) {
  return request.post(
    `/platform/package/homepage/${query.packageId}/${query.status}`,
    data,
    { params: query }
  );
}

export function houseList(query?: any) {
  return request.get('/platform/suite/page', { params: query });
}

export function usePage(query?: any) {
  return request.get('/platform/supplies/page', { params: query });
}

export function nursePage(query?: any) {
  return request.get('/platform/nursing_project/page', { params: query });
}
