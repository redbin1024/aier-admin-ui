import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/staff/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/staff/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/staff/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/staff/info/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/staff/update', data, { params: query });
}

export function homepage(data?: any, query?: any) {
  return request.post(
    `/platform/staff/homepage/${data.staffId}/${data.status}`,
    data,
    { params: query }
  );
}

export function queryStaffList(query?: any) {
  return request.get('/platform/staff/list', { params: query });
}
