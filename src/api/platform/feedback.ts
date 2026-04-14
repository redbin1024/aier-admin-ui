import request from '@/utils/request';

export function queryPage(query?: any) {
  return request.get('/platform/room_feedback/page', { params: query });
}

export function queryReplyList(feedbackId: string | number, query?: any) {
  return request.get(`/platform/room_feedback/reply_list/${feedbackId}`, {
    params: query,
  });
}

export function createRoomFeedback(data?: any, query?: any) {
  return request.post('/platform/room_feedback/create', data, {
    params: query,
  });
}
