import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/invitation_activity/page', { params: query });
}

export function save(data?: any, query?: any) {
  return request.post('/platform/invitation_activity/save', data, {
    params: query,
  });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/invitation_activity/update', data, {
    params: query,
  });
}

export function getinfo(query?: any) {
  return request.get('/platform/invitation_activity/detail/', {
    params: query,
  });
}

export function delTable(query?: any) {
  return request.delete('/platform/invitation_activity/remove?ids=', {
    params: query,
  });
}
