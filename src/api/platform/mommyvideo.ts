import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/tk/case/list', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/tk/case', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/tk/case/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/tk/case/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.put('/platform/tk/case', data, { params: query });
}

export function videoFirstFrame(query?: any) {
  return request.get('/common/videoFirstFrame', { params: query });
}
