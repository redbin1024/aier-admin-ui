import request from '@/utils/request';

export interface RuleTemplateRecord {
  id?: string;
  ruleCode: string;
  ruleName: string;
  description?: string;
  status: string;
  // Add other fields as needed
}

export interface RuleListParams {
  current?: number;
  pageSize?: number;
  ruleName?: string;
  ruleCode?: string;
  status?: string;
}

export function listRuleTemplates(params: RuleListParams) {
  return request.get('/ai/admin/outreach/rules/templates', { params });
}

export function getRuleTemplate(id: string) {
  return request.get(`/ai/admin/outreach/rules/templates/${id}`);
}

export function addRuleTemplate(data: RuleTemplateRecord) {
  return request.post('/ai/admin/outreach/rules/templates', data);
}

export function updateRuleTemplate(id: string, data: RuleTemplateRecord) {
  return request.put(`/ai/admin/outreach/rules/templates/${id}`, data);
}

export function delRuleTemplate(id: string) {
  return request.delete(`/ai/admin/outreach/rules/templates/${id}`);
}

export function enableRuleTemplate(id: string) {
  return request.post(`/ai/admin/outreach/rules/templates/${id}/enable`);
}

export function disableRuleTemplate(id: string) {
  return request.post(`/ai/admin/outreach/rules/templates/${id}/disable`);
}

export function listTenantRules(tenantId: string, params: RuleListParams) {
  return request.get(`/ai/admin/outreach/rules/tenant/${tenantId}`, { params });
}

export function initializeTenantRules(data: { tenantId: string }) {
  return request.post('/ai/admin/outreach/rules/initialize', data);
}

export function initializeAllTenantRules() {
  return request.post('/ai/admin/outreach/rules/initialize-all');
}

export function syncRulesToTenant(data: {
  tenantId: string;
  templateIds: string[];
}) {
  return request.post('/ai/admin/outreach/rules/sync', data);
}

export function syncRulesToAllTenants(data: { templateIds: string[] }) {
  return request.post('/ai/admin/outreach/rules/sync-all', data);
}

export function getRuleStatistics() {
  return request.get('/ai/admin/outreach/rules/statistics');
}

export function getAllRuleCodes() {
  return request.get('/ai/admin/outreach/rules/codes');
}

export function listMyRules(params: RuleListParams) {
  return request.get('/ai/outreach/admin/rules', { params });
}

export function getMyRule(id: string) {
  return request.get(`/ai/outreach/admin/rules/${id}`);
}

export function updateMyRule(id: string, data: any) {
  return request.put(`/ai/outreach/admin/rules/${id}`, data);
}

export function enableMyRule(id: string) {
  return request.post(`/ai/outreach/admin/rules/${id}/enable`);
}

export function disableMyRule(id: string) {
  return request.post(`/ai/outreach/admin/rules/${id}/disable`);
}
