import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/diary/page', { params: query });
}

export function roleCode(query?: any) {
  return request.get('/platform/diary/getMomTeam', { params: query });
}

export function roleCodeapi(query?: any) {
  return request.get('/platform/diary/getMomTeam?roleCode=', { params: query });
}

export function listByType(data?: any, query?: any) {
  return request.post('/platform/task_node/listByType', data, {
    params: query,
  });
}

export function getMomListapi(query?: any) {
  return request.get('/platform/diary/getMomList', { params: query });
}

export function templateStyle(query?: any) {
  return request.get('/platform/template_style/list', { params: query });
}

export function getDiaryTemplateapi(query?: any) {
  return request.get('/platform/diary/getDiaryTemplate', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/diary/publish', data, { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/diary/update', data, { params: query });
}

export function getDetailapi(query?: any) {
  return request.get('/platform/diary/getDetail?diaryId=', { params: query });
}

export function getDeleteapi(query?: any) {
  return request.get('/platform/diary/delete?diaryId=', { params: query });
}
