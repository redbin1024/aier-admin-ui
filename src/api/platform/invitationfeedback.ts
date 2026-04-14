import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/card_feedback/page', { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/card_feedback/', { params: query });
}
