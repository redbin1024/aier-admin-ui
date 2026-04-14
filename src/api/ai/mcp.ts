import request from '@/utils/request';

export interface McpConfigRecord {
  id?: string;
  name: string;
  url: string;
  enabled: boolean;
  // Add other fields as needed
}

export interface McpConfigListParams {
  current?: number;
  pageSize?: number;
  name?: string;
  enabled?: boolean;
}

export function listMcpConfig(params: McpConfigListParams) {
  return request.get('/ai/mcp/config/list', { params });
}

export function listEnabledMcp() {
  return request.get('/ai/mcp/config/enabled');
}

export function getMcpConfig(id: string) {
  return request.get(`/ai/mcp/config/${id}`);
}

export function addMcpConfig(data: McpConfigRecord) {
  return request.post('/ai/mcp/config', data);
}

export function updateMcpConfig(data: McpConfigRecord) {
  return request.put('/ai/mcp/config', data);
}

export function delMcpConfig(id: string) {
  return request.delete(`/ai/mcp/config/${id}`);
}

export function testMcpConnection(id: string) {
  return request.get(`/ai/mcp/config/test/${id}`);
}
