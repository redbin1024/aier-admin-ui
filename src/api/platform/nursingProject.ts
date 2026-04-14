import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/nursing_project/page', { params: query });
}

export function save1(data?: any, query?: any) {
  return request.put('/platform/nursing_project/save_mama', data, {
    params: query,
  });
}

export function save2(data?: any, query?: any) {
  return request.put('/platform/nursing_project/save_baby', data, {
    params: query,
  });
}

export function delTable(query?: any) {
  return request.delete('/platform/nursing_project/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/nursing_project/update', data, {
    params: query,
  });
}
