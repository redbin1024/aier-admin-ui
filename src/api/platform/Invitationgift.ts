import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/gift/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/gift/save', data, { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/gift/update', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/gift/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/gift/info/', { params: query });
}

export function online(data?: any, query?: any) {
  return request.post(
    `/platform/gift/online/${query.giftId}/${query.status}`,
    data,
    { params: query }
  );
}
