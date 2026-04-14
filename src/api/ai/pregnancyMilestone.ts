import request from '@/utils/request';

export interface MilestoneRecord {
  id?: string;
  milestoneTitle: string;
  category: string;
  week: number;
  status: string;
  // Add other fields as needed
}

export interface MilestoneListParams {
  current?: number;
  pageSize?: number;
  milestoneTitle?: string;
  category?: string;
  week?: number;
  status?: string;
}

export function getMilestoneList(params: MilestoneListParams) {
  return request.get('/admin/pregnancy-milestone/list', { params });
}

export function getMilestoneDetail(id: string) {
  return request.get(`/admin/pregnancy-milestone/${id}`);
}

export function createMilestone(data: MilestoneRecord) {
  return request.post('/admin/pregnancy-milestone', data);
}

export function updateMilestone(data: MilestoneRecord) {
  return request.put(`/admin/pregnancy-milestone/${data.id}`, data);
}

export function deleteMilestone(id: string) {
  return request.delete(`/admin/pregnancy-milestone/${id}`);
}

export function batchDeleteMilestone(ids: string[]) {
  // Front-end implementation: loop and call single delete
  return Promise.all(ids.map((id) => deleteMilestone(id)));
}

export function updateMilestoneStatus(id: string, status: string) {
  return request.put(`/admin/pregnancy-milestone/${id}/status`, { status });
}

export function getMilestonesByCategory(category: string) {
  return request.get('/admin/pregnancy-milestone/by-category', {
    params: { category },
  });
}

export function getMilestonesByWeek(week: number) {
  return request.get('/admin/pregnancy-milestone/by-week', {
    params: { week },
  });
}

export function getActiveMilestones() {
  return request.get('/admin/pregnancy-milestone/active');
}

export function sortMilestones(data: { ids: string[] }) {
  return request.put('/admin/pregnancy-milestone/sort', data);
}
