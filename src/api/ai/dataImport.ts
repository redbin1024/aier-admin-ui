import request from '@/utils/request';

export function importData(data: FormData) {
  return request.post('/ai/data/import/importData', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
