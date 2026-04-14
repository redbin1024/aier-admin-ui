import request from '@/utils/request';

export function getWechatConfigPage(query?: any) {
  return request.get('/platform/wechat_mini_program/page', { params: query });
}

export function updateWechatConfig(data?: any, query?: any) {
  return request.put('/platform/wechat_mini_program/update', data, {
    params: query,
  });
}

export function changeWechatConfigStatus(
  status: string | number,
  wConfigId: string | number,
  data?: any,
  query?: any
) {
  return request.post(
    `/platform/wechat_mini_program/change/${status}/${wConfigId}`,
    data,
    { params: query }
  );
}

export function saveWechatConfig(data?: any, query?: any) {
  return request.post('/platform/wechat_mini_program/save', data, {
    params: query,
  });
}

export function getWechatConfig(query?: any) {
  return request.get('/platform/wechat_mini_program/info/', { params: query });
}

export function getTenantMiniProgramPage(query?: any) {
  return request.get('/platform/tenant_mini_program/page', { params: query });
}

export function generateQrCode(query?: any) {
  return request.get('/platform/tenant_mini_program/qr_code/', {
    params: query,
  });
}

export function generateQrCodeWithPath(query?: any) {
  return request.get('/platform/tenant_mini_program/qr_code', {
    params: query,
  });
}

export function generateUrlLink(query?: any) {
  return request.get('/platform/tenant_mini_program/url_like/', {
    params: query,
  });
}

export function generateUrlScheme(query?: any) {
  return request.get('/platform/tenant_mini_program/url_scheme/', {
    params: query,
  });
}

export function saveTenantMiniProgram(data?: any, query?: any) {
  return request.post('/platform/tenant_mini_program/save', data, {
    params: query,
  });
}

export function getWechatUserPage(query?: any) {
  return request.get('/platform/wechat_user/page', { params: query });
}

export function changeWechatUserStatus(
  status: string | number,
  userId: string | number,
  data?: any,
  query?: any
) {
  return request.post(
    `/platform/wechat_user/change/${status}/${userId}`,
    data,
    { params: query }
  );
}

export function createWechatUser(data?: any, query?: any) {
  return request.post('/platform/wechat_user/save', data, { params: query });
}

export function removeWechatUser(userId: string | number, query?: any) {
  return request.delete(`/platform/wechat_user/remove/${userId}`, {
    params: query,
  });
}

export function updateWechatUser(data?: any, query?: any) {
  return request.put('/platform/wechat_user/update', data, { params: query });
}

export function getWechatUser(id: string | number, query?: any) {
  return request.get(`/platform/wechat_user/info/${id}`, { params: query });
}

export function creatUserForStaffId(staffId: string | number, query?: any) {
  return request.get(`/platform/wechat_user/creatForStaffId/${staffId}`, {
    params: query,
  });
}

export function creatForCustomerId(customerId: string | number, query?: any) {
  return request.get(`/platform/wechat_user/creatForCustomerId/${customerId}`, {
    params: query,
  });
}

export function getRoles(query?: any) {
  return request.get('/platform/wechat_user/roles', { params: query });
}

export function getTemplates(query?: any) {
  return request.get('/platform/wechat_template_config/getTemplates', {
    params: query,
  });
}

export function saveUpdate(data?: any, query?: any) {
  return request.post('/platform/wechat_template_config/saveUpdate', data, {
    params: query,
  });
}

export function getAllReminderTypes(query?: any) {
  return request.get('/platform/wechat_template_config/getAllReminderTypes', {
    params: query,
  });
}

export function getDetail(query?: any) {
  return request.get('/platform/wechat_template_config/getDetail', {
    params: query,
  });
}
