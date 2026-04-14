import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/postpartum_recovery/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/postpartum_recovery/save', data, {
    params: query,
  });
}

export function delTable(query?: any) {
  return request.delete('/platform/postpartum_recovery/', { params: query });
}

export function online(data?: any, query?: any) {
  return request.post(
    `/platform/postpartum_recovery/onShelf/${query.id}/${query.status}`,
    data,
    { params: query }
  );
}

export function info(query?: any) {
  return request.get('/platform/postpartum_recovery/info/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/postpartum_recovery/update', data, {
    params: query,
  });
}

export function homepage(data?: any, query?: any) {
  return request.post(
    `/platform/postpartum_recovery/homepage/${data.projectId}/${data.status}`,
    data,
    { params: query }
  );
}
