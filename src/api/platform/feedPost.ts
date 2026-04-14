import request from '@/utils/request';

export function page(query?: any) {
  return request.get('/platform/styleDynamic/page', { params: query });
}

export function update(data?: any, query?: any) {
  return request.post('/platform/styleDynamic/save', data, { params: query });
}

export function queryPage(query?: any) {
  return request.get('/platform/feed_post/page', { params: query });
}

export function queryInfo(postId: string | number, query?: any) {
  return request.get(`/platform/feed_post/${postId}`, { params: query });
}

export function getDetail(postId: string | number, query?: any) {
  return request.get(`/platform/feed_post/detail/${postId}`, { params: query });
}

export function queryStaffFeedPostInfo(postId: string | number, query?: any) {
  return request.get(`/platform/feed_post/info_staff/${postId}`, {
    params: query,
  });
}

export function getInfoByCustomerOrClub(postId: string | number, query?: any) {
  return request.get(`/platform/feed_post/info_customer_or_club/${postId}`, {
    params: query,
  });
}

export function createClubPost(data?: any, query?: any) {
  return request.post('/platform/feed_post/create_club', data, {
    params: query,
  });
}

export function updateFeedPost(data?: any, query?: any) {
  return request.post('/platform/feed_post/update', data, { params: query });
}

export function updateStaffFeedPost(data?: any, query?: any) {
  return request.put('/platform/feed_post/update_staff_feed_post', data, {
    params: query,
  });
}

export function featuredFeedPost(
  postId: string | number,
  featuredStatus: string | number,
  data?: any,
  query?: any
) {
  return request.post(
    `/platform/feed_post/featured/${postId}/${featuredStatus}`,
    data,
    { params: query }
  );
}

export function removeFeedPost(postId: string | number, query?: any) {
  return request.delete(`/platform/feed_post/${postId}`, { params: query });
}

export function getStaffCustomerOptions(
  staffUserId: string | number,
  query?: any
) {
  return request.get(
    `/platform/room/customer_options?staffUserId=${staffUserId}`,
    { params: query }
  );
}

export function create(data?: any, query?: any) {
  return request.post('/platform/feed_post/create', data, { params: query });
}

export function updateCustomerOrClubFeedPost(data?: any, query?: any) {
  return request.put(
    '/platform/feed_post/update_customer_or_club_feed_post',
    data,
    { params: query }
  );
}

export function getQueryStaffName(roleName: string | number, query?: any) {
  return request.get(`/platform/feed_post/queryStaffName/${roleName}`, {
    params: query,
  });
}

export function getQueryRooms(userId: string | number, query?: any) {
  return request.get(`/platform/feed_post/queryRooms/${userId}`, {
    params: query,
  });
}

export function listByType(data?: any, query?: any) {
  return request.post('/platform/feed_post/listByType', data, {
    params: query,
  });
}

export function listByLabel(name: string | number, query?: any) {
  return request.get(`/platform/feed_post/listByLabel/${name}`, {
    params: query,
  });
}
