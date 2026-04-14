import request from '@/utils/request';

export interface ProjectSupportServiceRecord {
  id?: string;
  serviceName: string;
  category: string;
  status: string;
  // Add other fields as needed
}

export interface ProjectSupportServiceListParams {
  current?: number;
  pageSize?: number;
  serviceName?: string;
  category?: string;
  status?: string;
}

export function listProjectSupportServices(
  params: ProjectSupportServiceListParams
) {
  return request.get('/ai/project-support-services/list', { params });
}

export function listAllProjectSupportServices() {
  return request.get('/ai/project-support-services/all');
}

export function getProjectSupportService(id: string) {
  return request.get(`/ai/project-support-services/${id}`);
}

export function addProjectSupportService(data: ProjectSupportServiceRecord) {
  return request.post('/ai/project-support-services', data);
}

export function updateProjectSupportService(data: ProjectSupportServiceRecord) {
  return request.put('/ai/project-support-services', data);
}

export function delProjectSupportService(id: string) {
  return request.delete(`/ai/project-support-services/${id}`);
}
