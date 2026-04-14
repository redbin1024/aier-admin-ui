import request from '@/utils/request';

export interface BillingListParams {
  current?: number;
  pageSize?: number;
  userId?: string;
  conversationId?: string;
  startTime?: string;
  endTime?: string;
}

export function getBillingStatistics() {
  return request.get('/ai/billing/statistics');
}

export function getBillingRecords(params: BillingListParams) {
  return request.get('/ai/billing/records', { params });
}

export function getUserBillingRecords(
  userId: string,
  params: BillingListParams
) {
  return request.get(`/ai/billing/records/user/${userId}`, { params });
}

export function getConversationBillingRecords(
  conversationId: string,
  params: BillingListParams
) {
  return request.get(`/ai/billing/records/conversation/${conversationId}`, {
    params,
  });
}

export function getTotalCost() {
  return request.get('/ai/billing/cost/total');
}

export function getTotalTokens() {
  return request.get('/ai/billing/tokens/total');
}

export function getTodayTokenUsage() {
  return request.get('/ai/billing/tokens/today');
}

export function getMonthlyTokenUsage() {
  return request.get('/ai/billing/tokens/monthly');
}

export function getTotalTokenUsage() {
  return request.get('/ai/billing/tokens/total-usage');
}

export function generateBillingReport(params: {
  startTime: string;
  endTime: string;
}) {
  return request.get('/ai/billing/report', { params });
}

export function exportBillingData(params: BillingListParams) {
  return request.get('/ai/billing/export', { params, responseType: 'blob' });
}
