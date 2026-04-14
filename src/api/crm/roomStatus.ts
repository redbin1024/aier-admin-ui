import request from '@/utils/request';

export function getRoomStatus(query?: any) {
  return request.get('/mp/room/status', { params: query });
}

export function getRoomOccupationRange(query?: any) {
  return request.get('/mp/room/occupation_range', { params: query });
}

export function getRoomStatusStats(query?: any) {
  return request.get('/mp/room/status_number', { params: query });
}

export function getSuiteStatus(query?: any) {
  return request.get('/mp/room/suiteStatus', { params: query });
}

export function getSuitesList(query?: any) {
  return request.get('/mp/room/suites_list', { params: query });
}

export function getRoomList(query?: any) {
  return request.get('/mp/room/list', { params: query });
}
