import request from '@/utils/request';

export interface DocumentRecord {
  id?: string;
  documentName: string;
  knowledgeBaseId: string;
  fileType: string;
  status: string;
  // Add other fields as needed
}

export interface DocumentListParams {
  current?: number;
  pageSize?: number;
  documentName?: string;
  knowledgeBaseId?: string;
  status?: string;
}

export function getDocumentList(params: DocumentListParams) {
  return request.get('/ai/documents/list', { params });
}

export function getAllDocuments() {
  return request.get('/ai/documents/all');
}

export function getDocumentsByKnowledgeId(knowledgeId: string) {
  return request.get(`/ai/documents/knowledge-base/${knowledgeId}`);
}

export function getDocumentDetail(documentId: string) {
  return request.get(`/ai/documents/${documentId}`);
}

export function getDocumentPreview(documentId: string) {
  return request.get(`/ai/documents/${documentId}/preview`);
}

export function createDocument(data: DocumentRecord) {
  return request.post('/ai/documents', data);
}

export function updateDocument(data: DocumentRecord) {
  return request.put('/ai/documents', data);
}

export function deleteDocuments(ids: string) {
  return request.delete(`/ai/documents/${ids}`);
}

export function uploadDocument(data: FormData) {
  return request.post('/ai/documents/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function batchUploadDocuments(data: FormData) {
  return request.post('/ai/documents/batch-upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function reprocessDocument(documentId: string) {
  return request.put(`/ai/documents/${documentId}/reprocess`);
}

export function getSupportedFileTypes() {
  return request.get('/ai/documents/supported-file-types');
}

export function checkFileTypeSupported(fileType: string) {
  return request.get('/ai/documents/check-file-type', { params: { fileType } });
}
