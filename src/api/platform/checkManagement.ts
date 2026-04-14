import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/checkin_gifts/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/checkin_gifts/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/checkin_gifts/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/checkin_gifts/info/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/checkin_gifts/update', data, {
    params: query,
  });
}

export function online(data?: any, query?: any) {
  return request.post(
    `/platform/checkin_gifts/change/${query.status}/${query.giftId}`,
    data,
    { params: query }
  );
}
