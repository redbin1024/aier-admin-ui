import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/suite/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/suite/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/suite/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/suite/info/', { params: query });
}

export function online(query?: any) {
  return request.get(
    `/platform/suite/online/${query.suiteId}/${query.status}`,
    { params: query }
  );
}

export function update(data?: any, query?: any) {
  return request.post('/platform/suite/update', data, { params: query });
}

export function suiteShow(query?: any) {
  return request.get(`/platform/suite/show/${query.suiteId}/${query.status}`, {
    params: query,
  });
}

export function setRecommended(data?: any, query?: any) {
  return request.post('/platform/suite/recommended', data, { params: query });
}

export function cancelRecommended(data?: any, query?: any) {
  return request.post('/platform/suite/cancel_recommended', data, {
    params: query,
  });
}
