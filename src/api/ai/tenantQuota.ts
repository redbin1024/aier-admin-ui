import request from '@/utils/request';

export function initializeQuota(data?: any, query?: any) {
  return request.post('/ai/admin/quota/initialize', data, { params: query });
}

export function rechargeQuota(data?: any, query?: any) {
  return request.post('/ai/admin/quota/recharge', data, { params: query });
}

export function getQuotaInfo(tenantId: string | number, query?: any) {
  return request.get(`/ai/admin/quota/info/${tenantId}`, { params: query });
}

export function getRechargeHistory(tenantId: string | number, query?: any) {
  return request.get(`/ai/admin/quota/recharge-history/${tenantId}`, {
    params: query,
  });
}

export function resetUsedQuota(
  tenantId: string | number,
  data?: any,
  query?: any
) {
  return request.post(`/ai/admin/quota/reset/${tenantId}`, data, {
    params: query,
  });
}

export function updateQuotaStatus(
  tenantId: string | number,
  data?: any,
  query?: any
) {
  return request.put(`/ai/admin/quota/update-status/${tenantId}`, data, {
    params: query,
  });
}
