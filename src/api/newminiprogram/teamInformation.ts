import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/tk/companyNews/list', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/tk/companyNews/add', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/tk/companyNews/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/tk/companyNews/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.put('/platform/tk/companyNews/update', data, {
    params: query,
  });
}
