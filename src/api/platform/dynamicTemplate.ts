import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/templateDynamic/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/templateDynamic/save', data, {
    params: query,
  });
}

export function delTable(query?: any) {
  return request.get('/platform/templateDynamic/remove?id=', { params: query });
}

export function info(query?: any) {
  return request.get('/platform/templateDynamic/info/', { params: query });
}

export function listByType(data?: any, query?: any) {
  return request.post('/platform/task_node/listByType', data, {
    params: query,
  });
}

export function templateStyle(query?: any) {
  return request.get('/platform/template_style/list', { params: query });
}

export function templateStyleAdd(data?: any, query?: any) {
  return request.put('/platform/template_style/save', data, { params: query });
}
