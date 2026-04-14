import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/topic/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/topic/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/topic/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/topic/info/', { params: query });
}

export function online(query?: any) {
  return request.get(
    `/platform/topic/online/${query.topicId}/${query.status}`,
    { params: query }
  );
}

export function update(data?: any, query?: any) {
  return request.post('/platform/topic/update', data, { params: query });
}
