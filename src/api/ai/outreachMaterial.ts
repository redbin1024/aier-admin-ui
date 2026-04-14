import request from '@/utils/request';

export interface MaterialRecord {
  id?: string;
  materialName: string;
  materialType: string;
  content: string;
  status: string;
  // Add other fields as needed
}

export interface MaterialListParams {
  current?: number;
  pageSize?: number;
  materialName?: string;
  materialType?: string;
  status?: string;
}

export function listMaterial(params: MaterialListParams) {
  return request.get('/ai/outreach/admin/materials', { params });
}

export function getMaterial(id: string) {
  return request.get(`/ai/outreach/admin/materials/${id}`);
}

export function addMaterial(data: MaterialRecord) {
  return request.post('/ai/outreach/admin/materials', data);
}

export function updateMaterial(id: string, data: MaterialRecord) {
  return request.put(`/ai/outreach/admin/materials/${id}`, data);
}

export function delMaterial(id: string) {
  return request.delete(`/ai/outreach/admin/materials/${id}`);
}

export function delMaterialBatch(ids: string[]) {
  return request.delete('/ai/outreach/admin/materials/batch', {
    data: { ids },
  });
}

export function enableMaterial(id: string) {
  return request.post(`/ai/outreach/admin/materials/${id}/enable`);
}

export function disableMaterial(id: string) {
  return request.post(`/ai/outreach/admin/materials/${id}/disable`);
}

export function getMaterialTypes() {
  return request.get('/ai/outreach/admin/materials/types');
}

export function getMiniprograms() {
  return request.get('/ai/outreach/admin/materials/miniprograms');
}

export function batchSendMaterial(data: {
  materialId: string;
  userIds: string[];
}) {
  return request.post('/ai/outreach/admin/materials/batch-send', data);
}
