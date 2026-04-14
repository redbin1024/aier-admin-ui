import request from '@/utils/request';

export interface ContactProfileListParams {
  current?: number;
  pageSize?: number;
  contactName?: string;
  externalId?: string;
  status?: string;
}

export function getContactProfile(data: { externalId: string }) {
  return request.post('/ai/wework/contact/profile/detail', data);
}

export function listContactProfiles(data: ContactProfileListParams) {
  return request.post('/ai/wework/contact/profile/list', data);
}

export function updateContactProfile(data: any) {
  return request.post('/ai/wework/contact/profile/update', data);
}

export function setDoNotDisturb(data: { externalId: string }) {
  return request.post('/ai/wework/contact/profile/do-not-disturb/set', data);
}

export function cancelDoNotDisturb(data: { externalId: string }) {
  return request.post('/ai/wework/contact/profile/do-not-disturb/cancel', data);
}

export function triggerProfileAnalysis(data: { externalId: string }) {
  return request.post('/ai/wework/contact/profile/analysis/trigger', data);
}
