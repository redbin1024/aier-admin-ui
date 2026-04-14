import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/club_activity/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/club_activity/save', data, { params: query });
}

export function detail(query?: any) {
  return request.get('/platform/club_activity/detail/', { params: query });
}

export function remove(query?: any) {
  return request.delete('/platform/club_activity/remove?activityIds=', {
    params: query,
  });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/club_activity/update', data, {
    params: query,
  });
}

export function isDisabled(query?: any) {
  return request.get('/platform/club_activity/isDisabled/', { params: query });
}
