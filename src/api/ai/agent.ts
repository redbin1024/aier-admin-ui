import request from '@/utils/request';

export interface AgentRecord {
  id?: string;
  agentCode: string;
  agentName: string;
  description?: string;
  status: string;
  isDefault: boolean;
  // Add other fields as needed
}

export interface AgentListParams {
  current?: number;
  pageSize?: number;
  agentName?: string;
  agentCode?: string;
  status?: string;
}

export function listAgent(params: AgentListParams) {
  return request.get('/ai/agent/list', { params });
}

export function getAgent(id: string) {
  return request.get(`/ai/agent/${id}`);
}

export function getAgentByCode(code: string) {
  return request.get(`/ai/agent/code/${code}`);
}

export function addAgent(data: AgentRecord) {
  return request.post('/ai/agent', data);
}

export function updateAgent(data: AgentRecord) {
  return request.put('/ai/agent', data);
}

export function delAgent(id: string) {
  return request.delete(`/ai/agent/${id}`);
}

export function changeAgentStatus(data: { id: string; status: string }) {
  return request.put('/ai/agent/changeStatus', data);
}

export function setDefaultAgent(id: string) {
  return request.put(`/ai/agent/setDefault/${id}`);
}

export function copyAgent(data: {
  id: string;
  agentName: string;
  agentCode: string;
}) {
  return request.post('/ai/agent/copy', data);
}

export function checkAgentCodeUnique(agentCode: string, id?: string) {
  return request.get('/ai/agent/checkAgentCodeUnique', {
    params: { agentCode, id },
  });
}

export function getAvailableAgents() {
  return request.get('/ai/agent/available');
}

export function getDefaultAgent() {
  return request.get('/ai/agent/default');
}
