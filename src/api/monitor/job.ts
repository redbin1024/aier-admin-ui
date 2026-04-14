import request from '@/utils/request';

export function listJob(query?: any) {
  return request.get('/monitor/job/list', { params: query });
}

export function getJob(query?: any) {
  return request.get('/monitor/job/', { params: query });
}

export function addJob(data?: any, query?: any) {
  return request.post('/monitor/job', data, { params: query });
}

export function updateJob(data?: any, query?: any) {
  return request.put('/monitor/job', data, { params: query });
}

export function delJob(query?: any) {
  return request.delete('/monitor/job/', { params: query });
}

export function changeJobStatus(data?: any, query?: any) {
  return request.put('/monitor/job/changeStatus', data, { params: query });
}

export function runJob(data?: any, query?: any) {
  return request.put('/monitor/job/run', data, { params: query });
}
