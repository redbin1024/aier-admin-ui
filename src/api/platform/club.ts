import request from '@/utils/request';

export function queryClubInfo(query?: any) {
  return request.get('/platform/club/info', { params: query });
}
