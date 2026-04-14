import request from '@/utils/request';

export function menuGroupPage(query?: any) {
  return request.get('/platform/menu_group/page', { params: query });
}

export function menuGroupDetail(query?: any) {
  return request.get('/platform/menu_group/detail/', { params: query });
}

export function menuGroupSave(data?: any, query?: any) {
  return request.post('/platform/menu_group/save', data, { params: query });
}

export function menuGroupUpdate(data?: any, query?: any) {
  return request.post('/platform/menu_group/update', data, { params: query });
}

export function menuGroupRemove(query?: any) {
  return request.delete('/platform/menu_group/remove', { params: query });
}

export function menuGroupToggle(query?: any) {
  return request.get('/platform/menu_group/toggle/', { params: query });
}

export function menuItemPage(query?: any) {
  return request.get('/platform/menu_item/page', { params: query });
}

export function menuItemDetail(query?: any) {
  return request.get('/platform/menu_item/detail/', { params: query });
}

export function menuItemSave(data?: any, query?: any) {
  return request.post('/platform/menu_item/save', data, { params: query });
}

export function menuItemUpdate(data?: any, query?: any) {
  return request.post('/platform/menu_item/update', data, { params: query });
}

export function menuItemRemove(query?: any) {
  return request.delete('/platform/menu_item/remove', { params: query });
}

export function menuItemToggle(query?: any) {
  return request.get('/platform/menu_item/toggle/', { params: query });
}
