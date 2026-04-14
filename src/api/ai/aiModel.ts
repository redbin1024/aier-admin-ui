import request from '@/utils/request';

export interface AiModelRecord {
  id?: string;
  modelName: string;
  modelCode: string;
  provider: string;
  status: string;
  // Add other fields as needed
}

export interface AiModelListParams {
  current?: number;
  pageSize?: number;
  modelName?: string;
  provider?: string;
}

export function syncModels() {
  return request.post('/admin/ai-model/sync');
}

export function listAiModels(params: AiModelListParams) {
  return request.get('/admin/ai-model/list', { params });
}

export function listValidModels() {
  return request.get('/admin/ai-model/list/valid');
}

export function addAiModel(data: AiModelRecord) {
  return request.post('/admin/ai-model', data);
}

export function updateAiModel(data: AiModelRecord) {
  return request.put(`/admin/ai-model/${data.id}`, data);
}

export function delAiModel(id: string) {
  return request.delete(`/admin/ai-model/${id}`);
}

export function delAiModels(ids: string[]) {
  return request.delete('/admin/ai-model/batch', { data: { ids } });
}

export function resolveAlias(alias: string) {
  return request.get('/admin/ai-model/resolve-alias', { params: { alias } });
}

export function getProviders() {
  return request.get('/admin/ai-model/providers');
}
