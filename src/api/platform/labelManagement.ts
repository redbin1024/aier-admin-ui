import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/customer_tag/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/customer_tag/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/customer_tag/', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/customer_tag/detail/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/customer_tag/update', data, { params: query });
}

export function updateConsultation(data?: any, query?: any) {
  return request.post('/platform/customer_tag/update_consultation', data, {
    params: query,
  });
}

export function getConsultation(data?: any, query?: any) {
  return request.post('/platform/customer_tag/get_consultation', data, {
    params: query,
  });
}
