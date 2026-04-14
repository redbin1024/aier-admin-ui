import request from '@/utils/request';

export function saves(data?: any, query?: any) {
  return request.post('/platform/meal/saveOrUpdate', data, { params: query });
}

export function infos(query?: any) {
  return request.get('/platform/meal/info/merchants', { params: query });
}

export function mealPage(query?: any) {
  return request.get('/platform/meal/page', { params: query });
}

export function getItemDetail(query?: any) {
  return request.get('/platform/meal/itemDetail?itemId=', { params: query });
}

export function deleteItem(query?: any) {
  return request.get('/platform/meal/deleteItem?itemId=', { params: query });
}

export function saveItem(data?: any, query?: any) {
  return request.post('/platform/meal/saveItem', data, { params: query });
}

export function isRec(query?: any) {
  return request.get('/platform/meal/isRec?itemId=', { params: query });
}

export function isMealTags(query?: any) {
  return request.get('/platform/meal/isMealTags?mealId=', { params: query });
}
