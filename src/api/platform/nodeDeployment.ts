import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/task_node/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/task_node/save', data, { params: query });
}

export function delTable(query?: any) {
  return request.delete('/platform/task_node/', { params: query });
}

export function update(data?: any, query?: any) {
  return request.put('/platform/task_node/update', data, { params: query });
}

export function getNodeOptions(query?: any) {
  return request.get('/platform/task_node/options', { params: query });
}

export function changeFeatured(data?: any, query?: any) {
  return request.post('/platform/task_node/changeFeatured', data, {
    params: query,
  });
}
