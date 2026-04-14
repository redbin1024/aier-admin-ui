import request from '@/utils/request';

export interface QuotaRecord {
  tenantId: string;
  tenantName: string;
  totalQuota: number;
  usedQuota: number;
  remainingQuota: number;
}

export interface QuotaListParams {
  current?: number;
  pageSize?: number;
  tenantName?: string;
}

export function listQuota(params: QuotaListParams) {
  return request.get('/ai/admin/quota/list', { params });
}

export function getMyQuotaInfo() {
  return request.get('/ai/tenant/quota/info');
}

export function getMyRechargeHistory(params: {
  current?: number;
  pageSize?: number;
}) {
  return request.get('/ai/tenant/quota/recharge-history', { params });
}
