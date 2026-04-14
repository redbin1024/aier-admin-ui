import request from '@/utils/request';

export function listPost(query?: any) {
  return request.get('/system/post/list', { params: query });
}

export function getPost(query?: any) {
  return request.get('/system/post/', { params: query });
}

export function addPost(data?: any, query?: any) {
  return request.post('/system/post', data, { params: query });
}

export function updatePost(data?: any, query?: any) {
  return request.put('/system/post', data, { params: query });
}

export function delPost(query?: any) {
  return request.delete('/system/post/', { params: query });
}
