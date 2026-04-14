import request from '@/utils/request';

export function list(query?: any) {
  return request.get('/platform/room/list', { params: query });
}

export function addLevel(data?: any, query?: any) {
  return request.put('/platform/room/add_level', data, { params: query });
}

export function listLevel(query?: any) {
  return request.get('/platform/room/list_level', { params: query });
}

export function listLevelRoom(query?: any) {
  return request.get('/platform/room/list_level_room', { params: query });
}

export function addRoom(data?: any, query?: any) {
  return request.put('/platform/room/add_room', data, { params: query });
}

export function houseList(query?: any) {
  return request.get('/platform/suite/page', { params: query });
}

export function options(query?: any) {
  return request.get('/platform/suite/options', { params: query });
}

export function customer(query?: any) {
  return request.get('/platform/customer/options', { params: query });
}

export function saveRoom(data?: any, query?: any) {
  return request.post('/platform/room', data, { params: query });
}

export function staffPage(query?: any) {
  return request.get('/platform/staff/page', { params: query });
}

export function todo(query?: any) {
  return request.get('/platform/room/todo/', { params: query });
}

export function reply(data?: any, query?: any) {
  return request.put('/platform/room/reply', data, { params: query });
}

export function checkoutPage(query?: any) {
  return request.get('/platform/room/checkout_page', { params: query });
}

export function checkoutPages(query?: any) {
  return request.get('/platform/room/checkout_page/', { params: query });
}

export function roomInfo(query?: any) {
  return request.get('/platform/room/info/', { params: query });
}

export function roomOptions(query?: any) {
  return request.get('/platform/room/options', { params: query });
}

export function checkOut(roomId: string | number, data?: any, query?: any) {
  return request.post(`/platform/room/out/${roomId}`, data, { params: query });
}
