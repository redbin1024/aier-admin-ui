import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/question/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.put('/platform/question/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/question/', { params: query });
}

export function homepage(data?: any, query?: any) {
  return request.put(
    `/platform/question/change/${query.state}/${query.questionId}`,
    data,
    { params: query }
  );
}
