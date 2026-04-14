import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/card_message_model/list', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/card_message_model/save', data, {
    params: query,
  });
}

export function delTable(query?: any) {
  return request.delete('/platform/card_message_model/', { params: query });
}
