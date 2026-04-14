import request from '@/utils/request';

export function saveBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export async function downloadRequest(options: {
  url: string;
  method?: 'GET' | 'POST';
  params?: Record<string, any>;
  data?: any;
  filename: string;
}) {
  const { url, method = 'GET', params, data, filename } = options;
  const blob = (await request({
    url,
    method,
    params,
    data,
    responseType: 'blob',
  })) as unknown as Blob;
  saveBlob(blob, filename);
}
