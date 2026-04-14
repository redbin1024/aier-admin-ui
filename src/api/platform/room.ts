import request from '@/utils/request';

export function getStaffCustomerOptions(
  staffUserId: string | number,
  query?: any
) {
  return request.get(
    `/platform/room/customer_options?staffUserId=${staffUserId}`,
    { params: query }
  );
}

export function getCustomerServicePersonnelOptions(
  customerId: string | number,
  query?: any
) {
  return request.get(`/platform/room/staff_options?customerId=${customerId}`, {
    params: query,
  });
}

export function replyRoomFeedback(data?: any, query?: any) {
  return request.post('/platform/room/reply', data, { params: query });
}

export function getList(query?: any) {
  return request.get('/platform/room/options', { params: query });
}

export function getRoomUserList(roomId: string | number, query?: any) {
  return request.get(`/platform/room/user_options?roomId=${roomId}`, {
    params: query,
  });
}
