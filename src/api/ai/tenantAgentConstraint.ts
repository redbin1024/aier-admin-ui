import request from '@/utils/request';

export function getConstraintTypes(query?: any) {
  return request.get('/ai/tenant/constraint/constraintTypes', {
    params: query,
  });
}

export function listConstraints(query?: any) {
  return request.get('/ai/tenant/constraint/list', { params: query });
}

export function listAllConstraints(query?: any) {
  return request.get('/ai/tenant/constraint/listAll', { params: query });
}

export function getConstraint(query?: any) {
  return request.get('/ai/tenant/constraint/', { params: query });
}

export function addConstraint(data?: any, query?: any) {
  return request.post('/ai/tenant/constraint', data, { params: query });
}

export function updateConstraint(data?: any, query?: any) {
  return request.put('/ai/tenant/constraint', data, { params: query });
}

export function delConstraint(query?: any) {
  return request.delete('/ai/tenant/constraint/', { params: query });
}

export function changeConstraintStatus(data?: any, query?: any) {
  return request.put('/ai/tenant/constraint/changeStatus', data, {
    params: query,
  });
}

export function batchUpdatePriority(data?: any, query?: any) {
  return request.put('/ai/tenant/constraint/priority', data, { params: query });
}
