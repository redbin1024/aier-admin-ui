import request from '@/utils/request';

export interface KnowledgeBaseRecord {
  id?: string;
  name: string;
  description?: string;
  status: string;
  // Add other fields as needed
}

export interface KnowledgeBaseListParams {
  current?: number;
  pageSize?: number;
  name?: string;
  status?: string;
}

export function getKnowledgeBaseList(params: KnowledgeBaseListParams) {
  return request.get('/ai/knowledge-bases/list', { params });
}

export function getAllKnowledgeBases() {
  return request.get('/ai/knowledge-bases/all');
}

export function getCurrentTenantKnowledgeBases() {
  return request.get('/ai/knowledge-bases/current-tenant');
}

export function getKnowledgeBaseDetail(knowledgeId: string) {
  return request.get(`/ai/knowledge-bases/${knowledgeId}`);
}

export function createKnowledgeBase(data: KnowledgeBaseRecord) {
  return request.post('/ai/knowledge-bases', data);
}

export function updateKnowledgeBase(data: KnowledgeBaseRecord) {
  return request.put('/ai/knowledge-bases', data);
}

export function deleteKnowledgeBases(ids: string) {
  return request.delete(`/ai/knowledge-bases/${ids}`);
}

export function checkKnowledgeNameUnique(name: string, id?: string) {
  return request.get('/ai/knowledge-bases/check-name', {
    params: { name, id },
  });
}

export function refreshStatistics(knowledgeId: string) {
  return request.put(`/ai/knowledge-bases/${knowledgeId}/refresh-statistics`);
}
