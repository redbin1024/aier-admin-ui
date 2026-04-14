import request from '@/utils/request';

export function listWeworkInstance(query?: any) {
  return request.get('/ai/wework/instance/list', { params: query });
}

export function getWeworkInstance(query?: any) {
  return request.get('/ai/wework/instance/', { params: query });
}

export function getWeworkInstanceByGuid(query?: any) {
  return request.get('/ai/wework/instance/', { params: query });
}

export function restoreWeworkInstance(data?: any, query?: any) {
  return request.post('/ai/wework/instance/restore', data, { params: query });
}

export function changeWeworkInstanceStatus(data?: any, query?: any) {
  return request.put('/ai/wework/instance/changeStatus', data, {
    params: query,
  });
}

export function getWeworkLoginQrcode(data?: any, query?: any) {
  return request.post('/ai/wework/qrcode/getLoginQrcode', data, {
    params: query,
  });
}

export function restoreAndGetLoginQrcode(data?: any, query?: any) {
  return request.post('/ai/wework/qrcode/restoreAndGetLoginQrcode', data, {
    params: query,
  });
}

export function checkWeworkLoginQrcode(data?: any, query?: any) {
  return request.post('/ai/wework/qrcode/checkLoginQrcode', data, {
    params: query,
  });
}

export function verifyWeworkLoginQrcode(data?: any, query?: any) {
  return request.post('/ai/wework/qrcode/verifyLoginQrcode', data, {
    params: query,
  });
}

export function manualWeworkLogin(data?: any, query?: any) {
  return request.post('/ai/wework/qrcode/manualLogin', data, { params: query });
}

export function checkWeworkUserLogin(data?: any, query?: any) {
  return request.post('/ai/wework/qrcode/checkLogin', data, { params: query });
}

export function stopWeworkInstance(data?: any, query?: any) {
  return request.post('/ai/wework/instance/stop/', data, { params: query });
}

export function deleteWeworkInstance(query?: any) {
  return request.delete('/ai/wework/instance/', { params: query });
}

export function bindWeworkAgent(data?: any, query?: any) {
  return request.post('/ai/wework/instance/bind-agent', data, {
    params: query,
  });
}

export function unbindWeworkAgent(data?: any, query?: any) {
  return request.post('/ai/wework/instance/bind-agent', data, {
    params: query,
  });
}

export function setDefaultQrcode(data?: any, query?: any) {
  return request.post('/ai/wework/instance/set-default-qrcode/', data, {
    params: query,
  });
}

export function cancelDefaultQrcode(data?: any, query?: any) {
  return request.post('/ai/wework/instance/cancel-default-qrcode/', data, {
    params: query,
  });
}

export function getExternalContactList(data?: any, query?: any) {
  return request.post('/ai/wework/contact/external/list', data, {
    params: query,
  });
}

export function getInternalContactList(data?: any, query?: any) {
  return request.post('/ai/wework/contact/internal/list', data, {
    params: query,
  });
}

export function batchGetContactInfo(data?: any, query?: any) {
  return request.post('/ai/wework/contact/batch/info', data, { params: query });
}

export function listCustomerService(query?: any) {
  return request.get('/ai/wework/customer-service/list', { params: query });
}

export function listAvailableCustomerService(query?: any) {
  return request.get('/ai/wework/customer-service/available', {
    params: query,
  });
}

export function getCustomerService(query?: any) {
  return request.get('/ai/wework/customer-service/', { params: query });
}

export function addCustomerService(data?: any, query?: any) {
  return request.post('/ai/wework/customer-service', data, { params: query });
}

export function updateCustomerService(data?: any, query?: any) {
  return request.put('/ai/wework/customer-service', data, { params: query });
}

export function delCustomerService(query?: any) {
  return request.delete('/ai/wework/customer-service/', { params: query });
}

export function changeCustomerServiceEnabled(data?: any, query?: any) {
  return request.put('/ai/wework/customer-service/', data, { params: query });
}

export function changeCustomerServiceStatus(data?: any, query?: any) {
  return request.put('/ai/wework/customer-service/', data, { params: query });
}

export function resetCustomerServiceSessions(data?: any, query?: any) {
  return request.put('/ai/wework/customer-service/', data, { params: query });
}

export function updateWeworkConfig(data?: any, query?: any) {
  return request.post('/ai/wework/instance/update-config', data, {
    params: query,
  });
}
