import request from '@/utils/request';

export function listTable(query?: any) {
  return request.get('/tool/gen/list', { params: query });
}

export function listDbTable(query?: any) {
  return request.get('/tool/gen/db/list', { params: query });
}

export function getGenTable(query?: any) {
  return request.get('/tool/gen/', { params: query });
}

export function updateGenTable(data?: any, query?: any) {
  return request.put('/tool/gen', data, { params: query });
}

export function importTable(data?: any, query?: any) {
  return request.post('/tool/gen/importTable', data, { params: query });
}

export function createTable(data?: any, query?: any) {
  return request.post('/tool/gen/createTable', data, { params: query });
}

export function previewTable(query?: any) {
  return request.get('/tool/gen/preview/', { params: query });
}

export function delTable(query?: any) {
  return request.delete('/tool/gen/', { params: query });
}

export function genCode(query?: any) {
  return request.get('/tool/gen/genCode/', { params: query });
}

export function synchDb(query?: any) {
  return request.get('/tool/gen/synchDb/', { params: query });
}
